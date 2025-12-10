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
        const competicoesParaSalvar = competicoes.map(c => {
            return {
                id: c.id,
                nome: c.nome,
                data: c.data,
                local: c.local,
                distancia: c.distancia,
                atletas: c.atletas,
                tipo: c instanceof Maratona ? 'maratona' : 'trail'
            };
        });
        const dados = JSON.stringify(competicoesParaSalvar);
        localStorage.setItem('competicoes', dados);
        localStorage.setItem('competicoesId', proximoId.toString());
    } catch (error) {
        console.error('Erro ao salvar competições:', error);
    }
}

function carregar() {
    if (carregado) return;
    
    try {
        const dados = localStorage.getItem('competicoes');
        if (dados) {
            const competicoesCarregadas = JSON.parse(dados);
            competicoes = competicoesCarregadas.map(c => {
                const comp = c.tipo === 'maratona' 
                    ? new Maratona(c.id, c.nome, c.data, c.local, c.distancia)
                    : new TrailRunning(c.id, c.nome, c.data, c.local, c.distancia);
                const atletasDaCompeticao = c.atletas;
                atletasDaCompeticao.forEach(idAtleta => comp.adicionarAtleta(idAtleta));
                return comp;
            });
            const id = localStorage.getItem('competicoesId');
            proximoId = id ? parseInt(id) : 1;
            carregado = true;
            console.log('✓ Competições carregadas do localStorage:', competicoes.length);
        }
    } catch (error) {
        console.error('Erro ao carregar competições:', error);
    }
}

export function inicializar() {
    carregar();
    if (competicoes.length === 0) carregarExemplos();
    configurarEventos();
    renderizarTabela(competicoes);
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
        btnCancelar.addEventListener('click', () => fecharFormulario());
    }

    const formCompeticao = document.getElementById('formCompeticao');
    if (formCompeticao) {
        formCompeticao.addEventListener('submit', (e) => {
            e.preventDefault();
            const dados = obterDadosFormulario();
            const nome = dados.nome;
            const data = dados.data;
            const local = dados.local;
            const distancia = dados.distancia;
            const tipo = dados.tipo;

            const validacao = validarDataCompeticao(data);
            if (!validacao.valido) {
                mostrarMensagem(validacao.mensagem, 'erro');
                return;
            }

            if (modoEdicao) {
                const comp = competicoes.find(c => c.id === idEmEdicao);
                if (comp) {
                    comp.nome = nome;
                    comp.data = data;
                    comp.local = local;
                    comp.distancia = distancia;
                    salvar();
                    mostrarMensagem('Competição atualizada!');
                }
            } else {
                const comp = tipo === 'maratona'
                    ? new Maratona(proximoId++, nome, data, local, distancia)
                    : new TrailRunning(proximoId++, nome, data, local, distancia);
                competicoes.push(comp);
                salvar();
                mostrarMensagem('Competição cadastrada!');
            }
            fecharFormulario();
            filtrar();
        });
    }

    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', () => filtrar());
    }

    const filtroTipo = document.getElementById('filtroTipo');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', () => filtrar());
    }

    const corpoTabelaCompeticoes = document.getElementById('corpoTabelaCompeticoes');
    if (corpoTabelaCompeticoes) {
        corpoTabelaCompeticoes.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            
            if (action === 'editar') {
                const comp = competicoes.find(c => c.id === id);
                if (comp) {
                    modoEdicao = true;
                    idEmEdicao = id;
                    abrirFormulario('editar');
                    const tipo = comp instanceof Maratona ? 'maratona' : 'trail';
                    preencherFormulario(comp, tipo);
                }
            } else if (action === 'excluir') {
                if (confirm('Excluir competição?')) {
                    competicoes = competicoes.filter(c => c.id !== id);
                    salvar();
                    mostrarMensagem('Competição excluída!');
                    filtrar();
                }
            }
        });
    }
}

function filtrar() {
    const filtroTipoElement = document.getElementById('filtroTipo');
    const campoBuscaElement = document.getElementById('campoBusca');
    
    const tipo = filtroTipoElement ? filtroTipoElement.value : 'todas';
    const busca = campoBuscaElement ? campoBuscaElement.value.toLowerCase().trim() : '';

    let filtradas = tipo === 'todas' ? competicoes
        : tipo === 'maratona' ? competicoes.filter(c => c instanceof Maratona)
        : competicoes.filter(c => c instanceof TrailRunning);

    if (busca) {
        filtradas = filtradas.filter(c => 
            c.nome.toLowerCase().includes(busca) || 
            c.local.toLowerCase().includes(busca)
        );
    }

    renderizarTabela(filtradas);
}

function carregarExemplos() {
    const maratonaSP = new Maratona(proximoId++, 'Maratona SP', '2025-06-15', 'São Paulo', 42);
    competicoes.push(maratonaSP);
    
    const trailMantiqueira = new TrailRunning(proximoId++, 'Trail Mantiqueira', '2025-07-20', 'Campos do Jordão', 21);
    competicoes.push(trailMantiqueira);
    
    const maratonaRJ = new Maratona(proximoId++, 'Maratona RJ', '2025-08-10', 'Rio de Janeiro', 42);
    competicoes.push(maratonaRJ);
    
    salvar();
}

export function buscarPorId(id) {
    carregar();
    return competicoes.find(c => c.id === id);
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
    const comp = buscarPorId(idCompeticao);
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