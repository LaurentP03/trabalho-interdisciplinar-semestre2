import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import * as competidorController from './CompetidorController.js';
import { Maratona } from '../models/Maratona.js';
import { renderizarCompeticoes, renderizarAtletas, selecionarCompeticao, selecionarAtleta, obterSelecao, limparSelecao, esconderListas, mostrarMensagem } from '../views/inscricoesView.js';

export function inicializar() {
    competicaoController.carregarDadosExemplo();
    atletaController.carregarDadosExemplo();
    competidorController.inicializar();
    
    setTimeout(function() {
        configurarEventos();
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
    }, 100);
}

function formatarCompeticaoParaView(comp) {
    let tipoFormatado;
    if (comp instanceof Maratona) {
        tipoFormatado = 'Maratona';
    } else {
        tipoFormatado = 'Trail Running';
    }
    
    return {
        id: comp.id,
        nome: comp.nome,
        data: comp.data,
        local: comp.local,
        distancia: comp.distancia,
        tipoFormatado: tipoFormatado
    };
}

function configurarEventos() {
    let btnInscrever = document.getElementById('btnInscreverAtleta');
    if (btnInscrever) {
        btnInscrever.addEventListener('click', function() {
            let selecao = obterSelecao();
            let idCompeticao = selecao.idCompeticao;
            let idAtleta = selecao.idAtleta;

            if (!idCompeticao || !idAtleta) {
                mostrarMensagem('Selecione uma competição e um atleta!', 'erro');
                return;
            }

            let comp = competicaoController.buscarPorId(idCompeticao);
            if (!comp) {
                mostrarMensagem('Competição não encontrada!', 'erro');
                return;
            }

            let atleta = atletaController.buscarPorId(idAtleta);
            if (!atleta) {
                mostrarMensagem('Atleta não encontrado!', 'erro');
                return;
            }

            let resultado = competidorController.inscreverAtleta(idAtleta, idCompeticao);
            
            if (resultado.sucesso) {
                let resultadoComp = competicaoController.adicionarAtletaCompeticao(idCompeticao, idAtleta);
                
                if (resultadoComp.sucesso) {
                    let mensagem = 'Atleta ' + atleta.nome + ' inscrito em ' + comp.nome + ' com sucesso!';
                    mostrarMensagem(mensagem, 'sucesso');
                    limparSelecao();
                } else {
                    mostrarMensagem(resultadoComp.mensagem, 'erro');
                }
            } else {
                mostrarMensagem(resultado.mensagem, 'erro');
            }
        });
    }

    let inputCompeticao = document.getElementById('buscaCompeticao');
    if (inputCompeticao) {
        inputCompeticao.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todasCompeticoes = competicaoController.listar();
            
            let resultados = todasCompeticoes.filter(function(c) {
                let nomeMinusculo = c.nome.toLowerCase();
                let localMinusculo = c.local.toLowerCase();
                let contemNome = nomeMinusculo.includes(termo);
                let contemLocal = localMinusculo.includes(termo);
                return contemNome || contemLocal;
            });
            
            let competicoesFormatadas = resultados.map(formatarCompeticaoParaView);
            renderizarCompeticoes(competicoesFormatadas);
        });
    }

    let inputAtleta = document.getElementById('buscaAtleta');
    if (inputAtleta) {
        inputAtleta.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todosAtletas = atletaController.listar();
            
            let resultados = todosAtletas.filter(function(a) {
                let nomeMinusculo = a.nome.toLowerCase();
                let contemNome = nomeMinusculo.includes(termo);
                let contemCPF = a.cpf.includes(termo);
                return contemNome || contemCPF;
            });
            
            renderizarAtletas(resultados);
        });
    }

    let listaCompeticoesEl = document.getElementById('listaCompeticoes');
    if (listaCompeticoesEl) {
        listaCompeticoesEl.addEventListener('click', function(e) {
            let item = e.target.closest('.lista-item');
            if (item && item.dataset.tipo === 'competicao') {
                let id = parseInt(item.dataset.id);
                let comp = competicaoController.buscarPorId(id);
                if (comp) {
                    let compFormatada = formatarCompeticaoParaView(comp);
                    selecionarCompeticao(compFormatada);
                }
            }
        });
    }

    let listaAtletasEl = document.getElementById('listaAtletas');
    if (listaAtletasEl) {
        listaAtletasEl.addEventListener('click', function(e) {
            let item = e.target.closest('.lista-item');
            if (item && item.dataset.tipo === 'atleta') {
                let id = parseInt(item.dataset.id);
                let atleta = atletaController.buscarPorId(id);
                if (atleta) {
                    selecionarAtleta(atleta);
                }
            }
        });
    }

    document.addEventListener('click', function(e) {
        let dentroContainer = e.target.closest('.busca-container');
        if (!dentroContainer) {
            esconderListas();
        }
    });
}