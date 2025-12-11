import { CompeticaoRepository } from '../repositories/CompeticaoRepository.js';
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { InscricaoRepository } from '../repositories/InscricaoRepository.js';
import {
    renderizarTabela,
    abrirFormulario,
    fecharFormulario,
    preencherFormulario,
    obterDadosFormulario,
    mostrarMensagem,
    validarDataCompeticao,
    abrirModalAtletas
} from '../views/competicoesView.js';

let modoEdicao = false;
let idEmEdicao = null;

export function inicializar() {
    CompeticaoRepository.carregar();
    CompeticaoRepository.carregarExemplos();
    
    configurarEventos();
    filtrar();
}

function configurarEventos() {
    const btnNovaCompeticao = document.getElementById('btnNovaCompeticao');
    if (btnNovaCompeticao) {
        btnNovaCompeticao.addEventListener('click', () => {
            modoEdicao = false;
            idEmEdicao = null;
            abrirFormulario('criar');
        });
    }

    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            fecharFormulario();
        });
    }

    const formCompeticao = document.getElementById('formCompeticao');
    if (formCompeticao) {
        formCompeticao.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit();
        });
    }

    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', filtrar);
    }

    const filtroTipo = document.getElementById('filtroTipo');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', filtrar);
    }

    const corpoTabela = document.getElementById('corpoTabelaCompeticoes');
    if (corpoTabela) {
        corpoTabela.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;

            if (action === 'ver-atletas') {
                handleVerAtletas(id);
            } else if (action === 'editar') {
                handleEditar(id);
            } else if (action === 'excluir') {
                handleExcluir(id);
            }
        });
    }
}

function handleSubmit() {
    const dados = obterDadosFormulario();
    const { nome, data, local, distancia, tipo } = dados;

    const validacao = validarDataCompeticao(data);
    if (!validacao.valido) {
        mostrarMensagem(validacao.mensagem, 'erro');
        return;
    }

    let resultado;

    if (modoEdicao) {
        resultado = CompeticaoRepository.atualizar(idEmEdicao, nome, data, local, distancia);
        if (resultado.sucesso) {
            mostrarMensagem('Competição atualizada!');
        }
    } else {
        resultado = CompeticaoRepository.criar(nome, data, local, distancia, tipo);
        if (resultado.sucesso) {
            mostrarMensagem('Competição cadastrada!');
        }
    }

    if (!resultado.sucesso) {
        mostrarMensagem(resultado.mensagem, 'erro');
        return;
    }

    fecharFormulario();
    filtrar();
}

function handleVerAtletas(idCompeticao) {
    const comp = CompeticaoRepository.buscarPorId(idCompeticao);
    if (!comp) return;

    const inscricoes = InscricaoRepository.listarPorCompeticao(idCompeticao);
    
    const atletasCompletos = inscricoes
        .map(inscricao => AtletaRepository.buscarPorId(inscricao.idAtleta))
        .filter(a => a !== undefined);

    const compFormatada = {
        id: comp.id,
        nome: comp.nome,
        data: comp.data,
        local: comp.local,
        distancia: comp.distancia,
        tipoFormatado: comp.constructor.name === 'Maratona' ? 'Maratona' : 'Trail Running'
    };

    abrirModalAtletas(compFormatada, atletasCompletos);
}

function handleEditar(idCompeticao) {
    const comp = CompeticaoRepository.buscarPorId(idCompeticao);
    if (!comp) return;

    modoEdicao = true;
    idEmEdicao = idCompeticao;
    abrirFormulario('editar');

    const tipo = comp.constructor.name === 'Maratona' ? 'maratona' : 'trail';
    preencherFormulario(comp, tipo);
}

function handleExcluir(idCompeticao) {
    const confirma = confirm('Deseja realmente excluir esta competição?');
    if (!confirma) return;

    const resultado = CompeticaoRepository.excluir(idCompeticao);

    if (resultado.sucesso) {
        mostrarMensagem('Competição excluída!');
        filtrar();
    }
}

function filtrar() {
    const filtroTipoElement = document.getElementById('filtroTipo');
    const campoBuscaElement = document.getElementById('campoBusca');

    const tipo = filtroTipoElement ? filtroTipoElement.value : 'todas';
    const busca = campoBuscaElement ? campoBuscaElement.value : '';

    const filtradas = CompeticaoRepository.filtrar(busca, tipo);
    const formatadas = CompeticaoRepository.prepararParaView(filtradas);
    
    renderizarTabela(formatadas);
}
