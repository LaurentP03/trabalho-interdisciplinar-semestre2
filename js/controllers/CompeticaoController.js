import { Maratona } from '../models/Maratona.js';
import { TrailRunning } from '../models/TrailRunning.js';
import { renderizarTabela, abrirFormulario, fecharFormulario, preencherFormulario, obterDadosFormulario, mostrarMensagem } from '../views/competicoesView.js';

let competicoes = [];
let proximoId = 1;
let modoEdicao = false;
let idEmEdicao = null;
let carregado = false;

function salvar() {
    try {
        const dados = JSON.stringify(competicoes.map(c => ({
            id: c.id, nome: c.nome, data: c.data, local: c.local,
            distancia: c.distancia, atletas: c.atletas,
            tipo: c instanceof Maratona ? 'maratona' : 'trail'
        })));
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
            competicoes = JSON.parse(dados).map(c => {
                const comp = c.tipo === 'maratona' 
                    ? new Maratona(c.id, c.nome, c.data, c.local, c.distancia)
                    : new TrailRunning(c.id, c.nome, c.data, c.local, c.distancia);
                c.atletas.forEach(idAtleta => comp.adicionarAtleta(idAtleta));
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
    document.getElementById('btnNovaCompeticao')?.addEventListener('click', () => {
        modoEdicao = false;
        idEmEdicao = null;
        abrirFormulario('criar');
    });

    document.getElementById('btnCancelar')?.addEventListener('click', () => fecharFormulario());

    document.getElementById('formCompeticao')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const dados = obterDadosFormulario();

        if (modoEdicao) {
            const comp = competicoes.find(c => c.id === idEmEdicao);
            if (comp) {
                comp.nome = dados.nome;
                comp.data = dados.data;
                comp.local = dados.local;
                comp.distancia = dados.distancia;
                salvar();
                mostrarMensagem('Competição atualizada!');
            }
        } else {
            const comp = dados.tipo === 'maratona'
                ? new Maratona(proximoId++, dados.nome, dados.data, dados.local, dados.distancia)
                : new TrailRunning(proximoId++, dados.nome, dados.data, dados.local, dados.distancia);
            competicoes.push(comp);
            salvar();
            mostrarMensagem('Competição cadastrada!');
        }
        fecharFormulario();
        filtrar();
    });

    document.getElementById('campoBusca')?.addEventListener('input', () => filtrar());
    document.getElementById('filtroTipo')?.addEventListener('change', () => filtrar());

    document.getElementById('corpoTabelaCompeticoes')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = parseInt(btn.dataset.id);
        
        if (btn.dataset.action === 'editar') {
            const comp = competicoes.find(c => c.id === id);
            if (comp) {
                modoEdicao = true;
                idEmEdicao = id;
                abrirFormulario('editar');
                preencherFormulario(comp, comp instanceof Maratona ? 'maratona' : 'trail');
            }
        } else if (btn.dataset.action === 'excluir') {
            if (confirm('Excluir competição?')) {
                competicoes = competicoes.filter(c => c.id !== id);
                salvar();
                mostrarMensagem('Competição excluída!');
                filtrar();
            }
        }
    });
}

function filtrar() {
    const tipo = document.getElementById('filtroTipo')?.value || 'todas';
    const busca = document.getElementById('campoBusca')?.value.toLowerCase().trim() || '';

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
    competicoes.push(new Maratona(proximoId++, 'Maratona SP', '2024-06-15', 'São Paulo', 42));
    competicoes.push(new TrailRunning(proximoId++, 'Trail Mantiqueira', '2024-07-20', 'Campos do Jordão', 21));
    competicoes.push(new Maratona(proximoId++, 'Maratona RJ', '2024-08-10', 'Rio de Janeiro', 42));
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
    if (!comp) return { sucesso: false, mensagem: 'Competição não encontrada!' };
    comp.adicionarAtleta(idAtleta);
    salvar();
    return { sucesso: true };
}

export function carregarDadosExemplo() {
    carregar();
    if (competicoes.length === 0) carregarExemplos();
}