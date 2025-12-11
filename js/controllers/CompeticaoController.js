import { Maratona } from '../models/Maratona.js';
import { TrailRunning } from '../models/TrailRunning.js';
import { renderizarTabela, abrirFormulario, fecharFormulario, preencherFormulario, obterDadosFormulario, mostrarMensagem, validarDataCompeticao } from '../views/competicoesView.js';

let competicoes = [];
let proximoId = 1;
let modoEdicao = false;
let idEmEdicao = null;
let carregado = false;

function salvar() {
    try {
        let competicoesParaSalvar = competicoes.map(function(c) {
            let tipo = c instanceof Maratona ? 'maratona' : 'trail';
            return {
                id: c.id,
                nome: c.nome,
                data: c.data,
                local: c.local,
                distancia: c.distancia,
                atletas: c.atletas,
                tipo: tipo
            };
        });
        
        let dados = JSON.stringify(competicoesParaSalvar);
        localStorage.setItem('competicoes', dados);
        localStorage.setItem('competicoesId', proximoId.toString());
    } catch (error) {
        console.error('Erro ao salvar competições:', error);
    }
}

function carregar() {
    if (carregado) return;
    
    try {
        let dados = localStorage.getItem('competicoes');
        if (dados) {
            let competicoesCarregadas = JSON.parse(dados);
            
            competicoes = competicoesCarregadas.map(function(c) {
                let comp;
                if (c.tipo === 'maratona') {
                    comp = new Maratona(c.id, c.nome, c.data, c.local, c.distancia);
                } else {
                    comp = new TrailRunning(c.id, c.nome, c.data, c.local, c.distancia);
                }
                
                let atletasDaCompeticao = c.atletas;
                atletasDaCompeticao.forEach(function(idAtleta) {
                    comp.adicionarAtleta(idAtleta);
                });
                
                return comp;
            });
            
            let id = localStorage.getItem('competicoesId');
            proximoId = id ? parseInt(id) : 1;
            carregado = true;
            console.log('✓ Competições carregadas do localStorage:', competicoes.length);
        }
    } catch (error) {
        console.error('Erro ao carregar competições:', error);
    }
}

function prepararParaView(competicoes) {
    return competicoes.map(function(c) {
        let tipoFormatado = c instanceof Maratona ? 'Maratona' : 'Trail Running';
        return {
            id: c.id,
            nome: c.nome,
            data: c.data,
            local: c.local,
            distancia: c.distancia,
            atletas: c.atletas,
            tipoFormatado: tipoFormatado
        };
    });
}

export function inicializar() {
    carregar();
    if (competicoes.length === 0) carregarExemplos();
    configurarEventos();
    renderizarTabela(prepararParaView(competicoes));
}

function configurarEventos() {
    let btnNovaCompeticao = document.getElementById('btnNovaCompeticao');
    if (btnNovaCompeticao) {
        btnNovaCompeticao.addEventListener('click', function() {
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

    let formCompeticao = document.getElementById('formCompeticao');
    if (formCompeticao) {
        formCompeticao.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let dados = obterDadosFormulario();
            let nome = dados.nome;
            let data = dados.data;
            let local = dados.local;
            let distancia = dados.distancia;
            let tipo = dados.tipo;

            let validacao = validarDataCompeticao(data);
            if (!validacao.valido) {
                mostrarMensagem(validacao.mensagem, 'erro');
                return;
            }

            if (modoEdicao) {
                let comp = competicoes.find(function(c) {
                    return c.id === idEmEdicao;
                });
                
                if (comp) {
                    comp.nome = nome;
                    comp.data = data;
                    comp.local = local;
                    comp.distancia = distancia;
                    salvar();
                    mostrarMensagem('Competição atualizada!');
                }
            } else {
                let comp;
                if (tipo === 'maratona') {
                    comp = new Maratona(proximoId++, nome, data, local, distancia);
                } else {
                    comp = new TrailRunning(proximoId++, nome, data, local, distancia);
                }
                
                competicoes.push(comp);
                salvar();
                mostrarMensagem('Competição cadastrada!');
            }
            
            fecharFormulario();
            filtrar();
        });
    }

    let campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', function() {
            filtrar();
        });
    }

    let filtroTipo = document.getElementById('filtroTipo');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', function() {
            filtrar();
        });
    }

    let corpoTabelaCompeticoes = document.getElementById('corpoTabelaCompeticoes');
    if (corpoTabelaCompeticoes) {
        corpoTabelaCompeticoes.addEventListener('click', function(e) {
            let btn = e.target.closest('button');
            if (!btn) return;

            let id = parseInt(btn.dataset.id);
            let action = btn.dataset.action;
            
            if (action === 'editar') {
                let comp = competicoes.find(function(c) {
                    return c.id === id;
                });
                
                if (comp) {
                    modoEdicao = true;
                    idEmEdicao = id;
                    abrirFormulario('editar');
                    let tipo = comp instanceof Maratona ? 'maratona' : 'trail';
                    preencherFormulario(comp, tipo);
                }
            } else if (action === 'excluir') {
                if (confirm('Excluir competição?')) {
                    competicoes = competicoes.filter(function(c) {
                        return c.id !== id;
                    });
                    salvar();
                    mostrarMensagem('Competição excluída!');
                    filtrar();
                }
            }
        });
    }
}

function filtrar() {
    let filtroTipoElement = document.getElementById('filtroTipo');
    let campoBuscaElement = document.getElementById('campoBusca');
    
    let tipo = filtroTipoElement ? filtroTipoElement.value : 'todas';
    let busca = campoBuscaElement ? campoBuscaElement.value.toLowerCase().trim() : '';

    let filtradas;
    if (tipo === 'todas') {
        filtradas = competicoes;
    } else if (tipo === 'maratona') {
        filtradas = competicoes.filter(function(c) {
            return c instanceof Maratona;
        });
    } else {
        filtradas = competicoes.filter(function(c) {
            return c instanceof TrailRunning;
        });
    }

    if (busca) {
        filtradas = filtradas.filter(function(c) {
            return c.nome.toLowerCase().includes(busca) || c.local.toLowerCase().includes(busca);
        });
    }

    renderizarTabela(prepararParaView(filtradas));
}

function carregarExemplos() {
    let maratonaSP = new Maratona(proximoId++, 'Maratona SP', '2025-06-15', 'São Paulo', 42);
    competicoes.push(maratonaSP);
    
    let trailMantiqueira = new TrailRunning(proximoId++, 'Trail Mantiqueira', '2025-07-20', 'Campos do Jordão', 21);
    competicoes.push(trailMantiqueira);
    
    let maratonaRJ = new Maratona(proximoId++, 'Maratona RJ', '2025-08-10', 'Rio de Janeiro', 42);
    competicoes.push(maratonaRJ);
    
    salvar();
}

export function buscarPorId(id) {
    carregar();
    return competicoes.find(function(c) {
        return c.id === id;
    });
}

export function listar() {
    carregar();
    console.log('listar() chamado - retornando', competicoes.length, 'competições');
    return competicoes;
}

export function contarTotal() {
    carregar();
    return competicoes.length;
}

export function adicionarAtletaCompeticao(idCompeticao, idAtleta) {
    carregar();
    let comp = buscarPorId(idCompeticao);
    if (!comp) {
        return { sucesso: false, mensagem: 'Competição não encontrada!' };
    }
    comp.adicionarAtleta(idAtleta);
    salvar();
    return { sucesso: true };
}

export function carregarDadosExemplo() {
    carregar();
    if (competicoes.length === 0) carregarExemplos();
}