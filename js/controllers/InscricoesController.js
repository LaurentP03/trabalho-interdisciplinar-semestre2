import { CompeticaoRepository } from '../repositories/CompeticaoRepository.js';
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { InscricaoRepository } from '../repositories/InscricaoRepository.js';
import {
    renderizarCompeticoes,
    renderizarAtletas,
    selecionarCompeticao,
    selecionarAtleta,
    obterSelecao,
    limparSelecao,
    esconderListas,
    mostrarMensagem
} from '../views/inscricoesView.js';

export function inicializar() {
    CompeticaoRepository.carregar();
    CompeticaoRepository.carregarExemplos();
    AtletaRepository.carregar();
    AtletaRepository.carregarExemplos();
    InscricaoRepository.carregar();

    setTimeout(() => {
        configurarEventos();
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
    }, 100);
}

function configurarEventos() {
    const btnInscrever = document.getElementById('btnInscreverAtleta');
    if (btnInscrever) {
        btnInscrever.addEventListener('click', handleInscrever);
    }

    const inputCompeticao = document.getElementById('buscaCompeticao');
    if (inputCompeticao) {
        inputCompeticao.addEventListener('input', handleBuscaCompeticao);
    }

    const inputAtleta = document.getElementById('buscaAtleta');
    if (inputAtleta) {
        inputAtleta.addEventListener('input', handleBuscaAtleta);
    }

    const listaCompeticoes = document.getElementById('listaCompeticoes');
    if (listaCompeticoes) {
        listaCompeticoes.addEventListener('click', handleClickCompeticao);
    }

    const listaAtletas = document.getElementById('listaAtletas');
    if (listaAtletas) {
        listaAtletas.addEventListener('click', handleClickAtleta);
    }

    document.addEventListener('click', (e) => {
        const dentroContainer = e.target.closest('.busca-container');
        if (!dentroContainer) {
            esconderListas();
        }
    });
}

function handleInscrever() {
    const selecao = obterSelecao();
    const { idCompeticao, idAtleta } = selecao;

    if (!idCompeticao || !idAtleta) {
        mostrarMensagem('Selecione uma competição e um atleta!', 'erro');
        return;
    }

    const comp = CompeticaoRepository.buscarPorId(idCompeticao);
    const atleta = AtletaRepository.buscarPorId(idAtleta);

    if (!comp) {
        mostrarMensagem('Competição não encontrada!', 'erro');
        return;
    }

    if (!atleta) {
        mostrarMensagem('Atleta não encontrado!', 'erro');
        return;
    }

    const resultadoInscricao = InscricaoRepository.criar(idAtleta, idCompeticao);

    if (!resultadoInscricao.sucesso) {
        mostrarMensagem(resultadoInscricao.mensagem, 'erro');
        return;
    }

    const resultadoComp = CompeticaoRepository.adicionarAtleta(idCompeticao, idAtleta);

    if (resultadoComp.sucesso) {
        const mensagem = `Atleta ${atleta.nome} inscrito em ${comp.nome} com sucesso!`;
        mostrarMensagem(mensagem, 'sucesso');
        limparSelecao();
    } else {
        mostrarMensagem(resultadoComp.mensagem, 'erro');
    }
}

function handleBuscaCompeticao(e) {
    const termo = e.target.value.toLowerCase().trim();

    if (termo.length < 1) {
        esconderListas();
        return;
    }

    const resultados = CompeticaoRepository.filtrar(termo, 'todas');
    const formatados = formatarCompeticoesParaView(resultados);
    
    renderizarCompeticoes(formatados);
}

function handleBuscaAtleta(e) {
    const termo = e.target.value.toLowerCase().trim();

    if (termo.length < 1) {
        esconderListas();
        return;
    }

    const resultados = AtletaRepository.filtrar(termo);
    renderizarAtletas(resultados);
}

function handleClickCompeticao(e) {
    const item = e.target.closest('.lista-item');
    if (item && item.dataset.tipo === 'competicao') {
        const id = parseInt(item.dataset.id);
        const comp = CompeticaoRepository.buscarPorId(id);
        
        if (comp) {
            const compFormatada = formatarCompeticaoParaView(comp);
            selecionarCompeticao(compFormatada);
        }
    }
}

function handleClickAtleta(e) {
    const item = e.target.closest('.lista-item');
    if (item && item.dataset.tipo === 'atleta') {
        const id = parseInt(item.dataset.id);
        const atleta = AtletaRepository.buscarPorId(id);
        
        if (atleta) {
            selecionarAtleta(atleta);
        }
    }
}

function formatarCompeticaoParaView(comp) {
    return {
        id: comp.id,
        nome: comp.nome,
        data: comp.data,
        local: comp.local,
        distancia: comp.distancia,
        tipoFormatado: comp.constructor.name === 'Maratona' ? 'Maratona' : 'Trail Running'
    };
}

function formatarCompeticoesParaView(competicoes) {
    return competicoes.map(formatarCompeticaoParaView);
}