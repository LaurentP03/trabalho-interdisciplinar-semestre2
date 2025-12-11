// js/controllers/AtletaController.js (REFATORADO)
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { CompeticaoRepository } from '../repositories/CompeticaoRepository.js';
import { InscricaoRepository } from '../repositories/InscricaoRepository.js';
import {
    renderizarTabela,
    abrirFormulario,
    fecharFormulario,
    preencherFormulario,
    obterDadosFormulario,
    mostrarMensagem,
    configurarMascaraCPF,
    validarDataNascimento,
    abrirModalCompeticoes
} from '../views/atletasView.js';

let modoEdicao = false;
let idEmEdicao = null;

export function inicializar() {
    AtletaRepository.carregar();
    AtletaRepository.carregarExemplos();
    
    configurarEventos();
    configurarMascaraCPF();
    renderizarTabela(AtletaRepository.listar());
}

function configurarEventos() {
    const btnNovoAtleta = document.getElementById('btnNovoAtleta');
    if (btnNovoAtleta) {
        btnNovoAtleta.addEventListener('click', () => {
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

    const formAtleta = document.getElementById('formAtleta');
    if (formAtleta) {
        formAtleta.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit();
        });
    }

    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', (e) => {
            const termo = e.target.value;
            const filtrados = AtletaRepository.filtrar(termo);
            renderizarTabela(filtrados);
        });
    }

    const corpoTabela = document.getElementById('corpoTabelaAtletas');
    if (corpoTabela) {
        corpoTabela.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;

            if (action === 'ver-competicoes') {
                handleVerCompeticoes(id);
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
    const { nome, cpf, dataNascimento } = dados;

    // Validar data
    const validacao = validarDataNascimento(dataNascimento);
    if (!validacao.valido) {
        mostrarMensagem(validacao.mensagem, 'erro');
        return;
    }

    let resultado;
    
    if (modoEdicao) {
        resultado = AtletaRepository.atualizar(idEmEdicao, nome, dataNascimento);
        if (resultado.sucesso) {
            mostrarMensagem('Atleta atualizado!');
        }
    } else {
        resultado = AtletaRepository.criar(nome, cpf, dataNascimento);
        if (resultado.sucesso) {
            mostrarMensagem('Atleta cadastrado!');
        }
    }

    if (!resultado.sucesso) {
        mostrarMensagem(resultado.mensagem, 'erro');
        return;
    }

    fecharFormulario();
    renderizarTabela(AtletaRepository.listar());
}

function handleVerCompeticoes(idAtleta) {
    const atleta = AtletaRepository.buscarPorId(idAtleta);
    if (!atleta) return;

    // Buscar inscrições do atleta
    const inscricoes = InscricaoRepository.listarPorAtleta(idAtleta);
    
    // Buscar dados completos das competições
    const competicoesCompletas = inscricoes
        .map(inscricao => {
            const comp = CompeticaoRepository.buscarPorId(inscricao.idCompeticao);
            if (!comp) return null;
            
            return {
                id: comp.id,
                nome: comp.nome,
                data: comp.data,
                local: comp.local,
                distancia: comp.distancia,
                tipoFormatado: comp.constructor.name === 'Maratona' ? 'Maratona' : 'Trail Running'
            };
        })
        .filter(c => c !== null);

    abrirModalCompeticoes(atleta, competicoesCompletas);
}

function handleEditar(idAtleta) {
    const atleta = AtletaRepository.buscarPorId(idAtleta);
    if (!atleta) return;

    modoEdicao = true;
    idEmEdicao = idAtleta;
    abrirFormulario('editar');
    preencherFormulario(atleta);
}

function handleExcluir(idAtleta) {
    const confirma = confirm('Deseja realmente excluir este atleta?');
    if (!confirma) return;

    const resultado = AtletaRepository.excluir(idAtleta);
    
    if (resultado.sucesso) {
        mostrarMensagem('Atleta excluído!');
        renderizarTabela(AtletaRepository.listar());
    }
}