import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import { Maratona } from '../models/Maratona.js';
import { renderizarCompeticoes, renderizarAtletas, selecionarCompeticao, selecionarAtleta, obterSelecao, limparSelecao, esconderListas, mostrarMensagem } from '../views/inscricoesView.js';

export function inicializar() {
    setTimeout(() => {
        configurarEventos();
        
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
        console.log('Competições:', competicaoController.listar());
        console.log('Atletas:', atletaController.listar());
    }, 150);
}

function formatarCompeticaoParaView(comp) {
    return {
        id: comp.id,
        nome: comp.nome,
        data: comp.data,
        local: comp.local,
        distancia: comp.distancia,
        tipoFormatado: comp instanceof Maratona ? 'Maratona' : 'Trail Running'
    };
}

function configurarEventos() {
    document.getElementById('btnInscreverAtleta')?.addEventListener('click', () => {
        const selecao = obterSelecao();
        const idCompeticao = selecao.idCompeticao;
        const idAtleta = selecao.idAtleta;

        if (!idCompeticao || !idAtleta) {
            mostrarMensagem('Selecione uma competição e um atleta!', 'erro');
            return;
        }

        const comp = competicaoController.buscarPorId(idCompeticao);
        if (!comp) {
            mostrarMensagem('Competição não encontrada!', 'erro');
            return;
        }

        if (comp.atletas.includes(idAtleta)) {
            mostrarMensagem('Atleta já está inscrito nesta competição!', 'erro');
            return;
        }

        competicaoController.adicionarAtletaCompeticao(idCompeticao, idAtleta);
        const atleta = atletaController.buscarPorId(idAtleta);
        mostrarMensagem(`${atleta.nome} inscrito em ${comp.nome} com sucesso!`, 'sucesso');
        limparSelecao();
    });

    const inputCompeticao = document.getElementById('buscaCompeticao');
    if (inputCompeticao) {
        console.log('Input de competição encontrado');
        
        inputCompeticao.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();
            console.log('>>> Buscando competição:', termo);
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            const todasCompeticoes = competicaoController.listar();
            console.log('>>> Total disponível:', todasCompeticoes.length);
            
            const resultados = todasCompeticoes.filter(c =>
                c.nome.toLowerCase().includes(termo) || 
                c.local.toLowerCase().includes(termo)
            );
            
            console.log('>>> Resultados:', resultados.length);
            
            const competicoesFormatadas = resultados.map(formatarCompeticaoParaView);
            renderizarCompeticoes(competicoesFormatadas);
        });
    } else {
        console.error('Input de competição NÃO encontrado!');
    }

    const inputAtleta = document.getElementById('buscaAtleta');
    if (inputAtleta) {
        console.log('Input de atleta encontrado');
        
        inputAtleta.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();
            console.log('>>> Buscando atleta:', termo);
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            const todosAtletas = atletaController.listar();
            console.log('>>> Total disponível:', todosAtletas.length);
            
            const resultados = todosAtletas.filter(a =>
                a.nome.toLowerCase().includes(termo) || 
                a.cpf.includes(termo)
            );
            
            console.log('>>> Resultados:', resultados.length);
            renderizarAtletas(resultados);
        });
    } else {
        console.error('Input de atleta NÃO encontrado!');
    }

    document.getElementById('listaCompeticoes')?.addEventListener('click', (e) => {
        const item = e.target.closest('.lista-item');
        if (item && item.dataset.tipo === 'competicao') {
            const comp = competicaoController.buscarPorId(parseInt(item.dataset.id));
            if (comp) {
                const compFormatada = formatarCompeticaoParaView(comp);
                selecionarCompeticao(compFormatada);
            }
        }
    });

    document.getElementById('listaAtletas')?.addEventListener('click', (e) => {
        const item = e.target.closest('.lista-item');
        if (item && item.dataset.tipo === 'atleta') {
            const atleta = atletaController.buscarPorId(parseInt(item.dataset.id));
            if (atleta) selecionarAtleta(atleta);
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.busca-container')) {
            esconderListas();
        }
    });
}