import { Atleta } from '../models/Atleta.js';
import { renderizarTabela, abrirFormulario, fecharFormulario, preencherFormulario, obterDadosFormulario, mostrarMensagem, configurarMascaraCPF, validarDataNascimento, abrirModalCompeticoes } from '../views/atletasView.js';
import * as competidorController from './CompetidorController.js';
import * as competicaoController from './CompeticaoController.js';

let atletas = [];
let proximoId = 1;
let modoEdicao = false;
let idEmEdicao = null;
let carregado = false;

function salvar() {
    try {
        let atletasParaSalvar = atletas.map(function(a) {
            return {
                id: a.id,
                nome: a.nome,
                cpf: a.cpf,
                dataNascimento: a.dataNascimento
            };
        });
        
        let dados = JSON.stringify(atletasParaSalvar);
        localStorage.setItem('atletas', dados);
        localStorage.setItem('atletasId', proximoId.toString());
    } catch (error) {
        console.error('Erro ao salvar atletas:', error);
    }
}

function carregar() {
    if (carregado) {
        return;
    }
    
    try {
        let dados = localStorage.getItem('atletas');
        if (dados) {
            let atletasCarregados = JSON.parse(dados);
            
            atletas = atletasCarregados.map(function(a) {
                return new Atleta(a.id, a.nome, a.cpf, a.dataNascimento);
            });
            
            let id = localStorage.getItem('atletasId');
            if (id) {
                proximoId = parseInt(id);
            } else {
                proximoId = 1;
            }
            carregado = true;
            console.log('Atletas carregados:', atletas.length);
        }
    } catch (error) {
        console.error('Erro ao carregar atletas:', error);
    }
}

export function inicializar() {
    carregar();
    if (atletas.length === 0) {
        carregarExemplos();
    }
    configurarEventos();
    configurarMascaraCPF();
    renderizarTabela(atletas);
}

function configurarEventos() {
    let btnNovoAtleta = document.getElementById('btnNovoAtleta');
    if (btnNovoAtleta) {
        btnNovoAtleta.addEventListener('click', function() {
            modoEdicao = false;
            idEmEdicao = null;
            abrirFormulario('criar');
        });
    }

    let btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            fecharFormulario();
        });
    }

    let formAtleta = document.getElementById('formAtleta');
    if (formAtleta) {
        formAtleta.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let dados = obterDadosFormulario();
            let nome = dados.nome;
            let cpf = dados.cpf;
            let dataNascimento = dados.dataNascimento;

            let validacao = validarDataNascimento(dataNascimento);
            if (!validacao.valido) {
                mostrarMensagem(validacao.mensagem, 'erro');
                return;
            }

            if (modoEdicao) {
                let atleta = atletas.find(function(a) {
                    return a.id === idEmEdicao;
                });
                
                if (atleta) {
                    atleta.nome = nome;
                    atleta.dataNascimento = dataNascimento;
                    salvar();
                    mostrarMensagem('Atleta atualizado!');
                }
            } else {
                let atletaExistente = atletas.find(function(a) {
                    return a.cpf === cpf;
                });
                
                if (atletaExistente) {
                    mostrarMensagem('CPF já cadastrado!', 'erro');
                    return;
                }
                
                let novoAtleta = new Atleta(proximoId, nome, cpf, dataNascimento);
                proximoId = proximoId + 1;
                atletas.push(novoAtleta);
                salvar();
                mostrarMensagem('Atleta cadastrado!');
            }
            
            fecharFormulario();
            renderizarTabela(atletas);
        });
    }

    let campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', function(e) {
            let termo = e.target.value.toLowerCase().trim();
            
            if (!termo) {
                renderizarTabela(atletas);
                return;
            }
            
            let filtrados = atletas.filter(function(a) {
                let nomeMinusculo = a.nome.toLowerCase();
                let contemNome = nomeMinusculo.includes(termo);
                let contemCPF = a.cpf.includes(termo);
                return contemNome || contemCPF;
            });
            
            renderizarTabela(filtrados);
        });
    }

    let corpoTabelaAtletas = document.getElementById('corpoTabelaAtletas');
    if (corpoTabelaAtletas) {
        corpoTabelaAtletas.addEventListener('click', function(e) {
            let btn = e.target.closest('button');
            if (!btn) {
                return;
            }

            let id = parseInt(btn.dataset.id);
            let action = btn.dataset.action;
            
            if (action === 'ver-competicoes') {
                let atleta = atletas.find(function(a) {
                    return a.id === id;
                });
                
                if (atleta) {
                    let inscricoes = competidorController.listarPorAtleta(id);
                    
                    let competicoesCompletas = [];
                    inscricoes.forEach(function(inscricao) {
                        let comp = competicaoController.buscarPorId(inscricao.idCompeticao);
                        if (comp) {
                            let tipoFormatado;
                            if (comp.constructor.name === 'Maratona') {
                                tipoFormatado = 'Maratona';
                            } else {
                                tipoFormatado = 'Trail Running';
                            }
                            
                            competicoesCompletas.push({
                                id: comp.id,
                                nome: comp.nome,
                                data: comp.data,
                                local: comp.local,
                                distancia: comp.distancia,
                                tipoFormatado: tipoFormatado
                            });
                        }
                    });
                    
                    abrirModalCompeticoes(atleta, competicoesCompletas);
                }
            } else if (action === 'editar') {
                let atleta = atletas.find(function(a) {
                    return a.id === id;
                });
                
                if (atleta) {
                    modoEdicao = true;
                    idEmEdicao = id;
                    abrirFormulario('editar');
                    preencherFormulario(atleta);
                }
            } else if (action === 'excluir') {
                let confirma = confirm('Deseja realmente excluir este atleta?');
                if (confirma) {
                    atletas = atletas.filter(function(a) {
                        return a.id !== id;
                    });
                    salvar();
                    mostrarMensagem('Atleta excluído!');
                    renderizarTabela(atletas);
                }
            }
        });
    }
}

function carregarExemplos() {
    let exemplo1 = new Atleta(proximoId, 'João Silva', '123.456.789-00', '1990-05-15');
    proximoId = proximoId + 1;
    atletas.push(exemplo1);
    
    let exemplo2 = new Atleta(proximoId, 'Maria Santos', '987.654.321-00', '1985-08-20');
    proximoId = proximoId + 1;
    atletas.push(exemplo2);
    
    let exemplo3 = new Atleta(proximoId, 'Pedro Costa', '456.789.123-00', '2000-03-10');
    proximoId = proximoId + 1;
    atletas.push(exemplo3);
    
    salvar();
}

export function buscarPorId(id) {
    carregar();
    return atletas.find(function(a) {
        return a.id === id;
    });
}

export function listar() {
    carregar();
    return atletas;
}

export function contarTotal() {
    carregar();
    return atletas.length;
}

export function carregarDadosExemplo() {
    carregar();
    if (atletas.length === 0) {
        carregarExemplos();
    }
}