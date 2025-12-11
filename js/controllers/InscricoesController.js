import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import { Maratona } from '../models/Maratona.js';
import { renderizarCompeticoes, renderizarAtletas, selecionarCompeticao, selecionarAtleta, obterSelecao, limparSelecao, esconderListas, mostrarMensagem } from '../views/inscricoesView.js';

export function inicializar() {
    setTimeout(function() {
        configurarEventos();
        
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
        console.log('Competições:', competicaoController.listar());
        console.log('Atletas:', atletaController.listar());
    }, 150);
}

function formatarCompeticaoParaView(comp) {
    let tipoFormatado = comp instanceof Maratona ? 'Maratona' : 'Trail Running';
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

            if (comp.atletas.includes(idAtleta)) {
                mostrarMensagem('Atleta já está inscrito nesta competição!', 'erro');
                return;
            }

            competicaoController.adicionarAtletaCompeticao(idCompeticao, idAtleta);
            let atleta = atletaController.buscarPorId(idAtleta);
            mostrarMensagem(atleta.nome + ' inscrito em ' + comp.nome + ' com sucesso!', 'sucesso');
            limparSelecao();
        });
    }

    let inputCompeticao = document.getElementById('buscaCompeticao');
    if (inputCompeticao) {
        console.log('Input de competição encontrado');
        
        inputCompeticao.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            console.log('>>> Buscando competição:', termo);
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todasCompeticoes = competicaoController.listar();
            console.log('>>> Total disponível:', todasCompeticoes.length);
            
            let resultados = todasCompeticoes.filter(function(c) {
                return c.nome.toLowerCase().includes(termo) || c.local.toLowerCase().includes(termo);
            });
            
            console.log('>>> Resultados:', resultados.length);
            
            let competicoesFormatadas = resultados.map(formatarCompeticaoParaView);
            renderizarCompeticoes(competicoesFormatadas);
        });
    } else {
        console.error('Input de competição NÃO encontrado!');
    }

    let inputAtleta = document.getElementById('buscaAtleta');
    if (inputAtleta) {
        console.log('Input de atleta encontrado');
        
        inputAtleta.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            console.log('>>> Buscando atleta:', termo);
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todosAtletas = atletaController.listar();
            console.log('>>> Total disponível:', todosAtletas.length);
            
            let resultados = todosAtletas.filter(function(a) {
                return a.nome.toLowerCase().includes(termo) || a.cpf.includes(termo);
            });
            
            console.log('>>> Resultados:', resultados.length);
            renderizarAtletas(resultados);
        });
    } else {
        console.error('Input de atleta NÃO encontrado!');
    }

    let listaCompeticoesEl = document.getElementById('listaCompeticoes');
    if (listaCompeticoesEl) {
        listaCompeticoesEl.addEventListener('click', function(e) {
            let item = e.target.closest('.lista-item');
            if (item && item.dataset.tipo === 'competicao') {
                let comp = competicaoController.buscarPorId(parseInt(item.dataset.id));
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
                let atleta = atletaController.buscarPorId(parseInt(item.dataset.id));
                if (atleta) {
                    selecionarAtleta(atleta);
                }
            }
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.busca-container')) {
            esconderListas();
        }
    });
}