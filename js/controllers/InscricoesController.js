import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import * as competidorController from './CompetidorController.js';
import { Maratona } from '../models/Maratona.js';
import { renderizarCompeticoes, renderizarAtletas, selecionarCompeticao, selecionarAtleta, obterSelecao, limparSelecao, esconderListas, mostrarMensagem } from '../views/inscricoesView.js';

export function inicializar() {
    // Garante que os dados estão carregados antes de configurar eventos
    competicaoController.carregarDadosExemplo();
    atletaController.carregarDadosExemplo();
    competidorController.inicializar();
    
    // Pequeno delay para garantir que tudo foi carregado
    setTimeout(function() {
        configurarEventos();
        
        console.log('=== INSCRIÇÕES INICIALIZADAS ===');
        console.log('Competições:', competicaoController.listar().length);
        console.log('Atletas:', atletaController.listar().length);
    }, 100);
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

            console.log('=== TENTANDO INSCREVER ===');
            console.log('ID Competição:', idCompeticao);
            console.log('ID Atleta:', idAtleta);

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

            // Primeiro inscreve no sistema de competidores
            let resultado = competidorController.inscreverAtleta(idAtleta, idCompeticao);
            
            if (resultado.sucesso) {
                // Depois adiciona o atleta na competição
                let resultadoComp = competicaoController.adicionarAtletaCompeticao(idCompeticao, idAtleta);
                
                if (resultadoComp.sucesso) {
                    mostrarMensagem('✓ ' + atleta.nome + ' inscrito em ' + comp.nome + ' com sucesso!', 'sucesso');
                    limparSelecao();
                    
                    console.log('=== INSCRIÇÃO REALIZADA ===');
                    console.log('Atleta:', atleta.nome);
                    console.log('Competição:', comp.nome);
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
        console.log('✓ Input de competição encontrado');
        
        inputCompeticao.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todasCompeticoes = competicaoController.listar();
            console.log('Buscando competição. Total disponível:', todasCompeticoes.length);
            
            let resultados = todasCompeticoes.filter(function(c) {
                return c.nome.toLowerCase().includes(termo) || c.local.toLowerCase().includes(termo);
            });
            
            console.log('Resultados encontrados:', resultados.length);
            
            let competicoesFormatadas = resultados.map(formatarCompeticaoParaView);
            renderizarCompeticoes(competicoesFormatadas);
        });
    } else {
        console.error('✗ Input de competição NÃO encontrado!');
    }

    let inputAtleta = document.getElementById('buscaAtleta');
    if (inputAtleta) {
        console.log('✓ Input de atleta encontrado');
        
        inputAtleta.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            
            if (termo.length < 1) {
                esconderListas();
                return;
            }
            
            let todosAtletas = atletaController.listar();
            console.log('Buscando atleta. Total disponível:', todosAtletas.length);
            
            let resultados = todosAtletas.filter(function(a) {
                return a.nome.toLowerCase().includes(termo) || a.cpf.includes(termo);
            });
            
            console.log('Resultados encontrados:', resultados.length);
            renderizarAtletas(resultados);
        });
    } else {
        console.error('✗ Input de atleta NÃO encontrado!');
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
                    console.log('Competição selecionada:', compFormatada.nome);
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
                    console.log('Atleta selecionado:', atleta.nome);
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