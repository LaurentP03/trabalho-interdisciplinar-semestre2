import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import { renderizarCompeticoes, renderizarAtletas, selecionarCompeticao, selecionarAtleta, obterSelecao, limparSelecao, esconderListas, mostrarMensagem } from '../views/inscricoesView.js';

export function inicializar() {
    setTimeout(function() {
        configurarEventos();
        
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
        console.log('Competições:', competicaoController.listar());
        console.log('Atletas:', atletaController.listar());
    }, 150);
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

            let jaInscrito = false;
            let i = 0;
            
            while (i < comp.atletas.length) {
                if (comp.atletas[i] === idAtleta) {
                    jaInscrito = true;
                    break;
                }
                i = i + 1;
            }
            
            if (jaInscrito) {
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
            
            let resultados = [];
            let i = 0;
            
            while (i < todasCompeticoes.length) {
                let c = todasCompeticoes[i];
                let nomeContem = c.nome.toLowerCase().includes(termo);
                let localContem = c.local.toLowerCase().includes(termo);
                
                if (nomeContem || localContem) {
                    resultados.push(c);
                }
                
                i = i + 1;
            }
            
            console.log('>>> Resultados:', resultados.length);
            renderizarCompeticoes(resultados);
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
            
            let resultados = [];
            let i = 0;
            
            while (i < todosAtletas.length) {
                let a = todosAtletas[i];
                let nomeContem = a.nome.toLowerCase().includes(termo);
                let cpfContem = a.cpf.includes(termo);
                
                if (nomeContem || cpfContem) {
                    resultados.push(a);
                }
                
                i = i + 1;
            }
            
            console.log('>>> Resultados:', resultados.length);
            renderizarAtletas(resultados);
        });
    } else {
        console.error('Input de atleta NÃO encontrado!');
    }

    let listaComp = document.getElementById('listaCompeticoes');
    if (listaComp) {
        listaComp.addEventListener('click', function(e) {
            let item = e.target.closest('.lista-item');
            
            if (item && item.dataset.tipo === 'competicao') {
                let id = parseInt(item.dataset.id);
                let comp = competicaoController.buscarPorId(id);
                
                if (comp) {
                    selecionarCompeticao(comp);
                }
            }
        });
    }

    let listaAtl = document.getElementById('listaAtletas');
    if (listaAtl) {
        listaAtl.addEventListener('click', function(e) {
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