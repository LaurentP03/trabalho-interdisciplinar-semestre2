import { Maratona } from '../models/Maratona.js';
import { TrailRunning } from '../models/TrailRunning.js';
import { renderizarTabela, abrirFormulario, fecharFormulario, preencherFormulario, obterDadosFormulario, mostrarMensagem } from '../views/competicoesView.js';

let competicoes = [];
let proximoId = 1;
let modoEdicao = false;
let idEmEdicao = null;
let carregado = false;

function salvar() {
    if (!Array.isArray(competicoes)) {
        console.error('Erro ao salvar competições: lista inválida');
        return;
    }

    let competicoesParaSalvar = competicoes.map(c => ({
        id: c.id,
        nome: c.nome,
        data: c.data,
        local: c.local,
        distancia: c.distancia,
        atletas: c.atletas ?? [],
        tipo: c instanceof Maratona ? 'maratona' : 'trail'
    }));

    localStorage.setItem('competicoes', JSON.stringify(competicoesParaSalvar));
    localStorage.setItem('competicoesId', proximoId.toString());
}

function carregar() {
    if (carregado) return;

    let dados = localStorage.getItem('competicoes');
    if (!dados) return;

    let competicoesCarregadas = JSON.parse(dados);
    if (!Array.isArray(competicoesCarregadas)) return;

    competicoes = [];

    for (let c of competicoesCarregadas) {
        let comp =
            c.tipo === 'maratona'
                ? new Maratona(c.id, c.nome, c.data, c.local, c.distancia)
                : new TrailRunning(c.id, c.nome, c.data, c.local, c.distancia);

        let atletas = c.atletas ?? []; // ← CORREÇÃO PRINCIPAL

        for (let atleta of atletas) {
            comp.adicionarAtleta(atleta);
        }

        competicoes.push(comp);
    }

    let id = parseInt(localStorage.getItem('competicoesId'));
    proximoId = isNaN(id) ? 1 : id;

    carregado = true;
    console.log(`✓ Competições carregadas: ${competicoes.length}`);
}

export function inicializar() {
    carregar();

    if (!competicoes || competicoes.length === 0) {
        carregarExemplos();
    }

    configurarEventos();
    renderizarTabela(competicoes);
}

function configurarEventos() {
    let btnNova = document.getElementById('btnNovaCompeticao');
    if (btnNova) {
        btnNova.addEventListener('click', () => {
            modoEdicao = false;
            idEmEdicao = null;
            abrirFormulario('criar');
        });
    }

    let btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', fecharFormulario);
    }

    let form = document.getElementById('formCompeticao');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let dados = obterDadosFormulario();

            if (modoEdicao) {
                let comp = competicoes.find(c => c.id === idEmEdicao);
                if (comp) {
                    comp.nome = dados.nome;
                    comp.data = dados.data;
                    comp.local = dados.local;
                    comp.distancia = dados.distancia;
                    salvar();
                    mostrarMensagem('Competição atualizada!');
                }
            } else {
                if (competicoes.some(c => c.nome === dados.nome)) {
                    mostrarMensagem('Já existe uma competição com esse nome!');
                    return;
                }

                let nova =
                    dados.tipo === 'maratona'
                        ? new Maratona(proximoId, dados.nome, dados.data, dados.local, dados.distancia)
                        : new TrailRunning(proximoId, dados.nome, dados.data, dados.local, dados.distancia);

                competicoes.push(nova);
                proximoId++;
                salvar();
                mostrarMensagem('Competição cadastrada!');
            }

            fecharFormulario();
            filtrar();
        });
    }

    let campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', filtrar);
    }

    let filtroTipo = document.getElementById('filtroTipo');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', filtrar);
    }

    let tabelaCorpo = document.getElementById('corpoTabelaCompeticoes');
    if (tabelaCorpo) {
        tabelaCorpo.addEventListener('click', function(e) {
            let btn = e.target.closest('button');
            if (!btn) return;

            let id = parseInt(btn.dataset.id);

            if (btn.dataset.action === 'editar') {
                let comp = competicoes.find(c => c.id === id);
                if (!comp) return;

                modoEdicao = true;
                idEmEdicao = id;
                abrirFormulario('editar');

                let tipo = comp instanceof Maratona ? 'maratona' : 'trail';
                preencherFormulario(comp, tipo);
            } 
            else if (btn.dataset.action === 'excluir') {
                if (!confirm('Excluir competição?')) return;

                competicoes = competicoes.filter(c => c.id !== id);
                salvar();
                mostrarMensagem('Competição excluída!');
                filtrar();
            }
        });
    }
}

function filtrar() {
    let tipo = document.getElementById('filtroTipo')?.value ?? 'todas';
    let busca = document.getElementById('campoBusca')?.value.toLowerCase().trim() ?? '';

    let filtradas = competicoes.filter(c => {
        let incluir =
            tipo === 'todas' ||
            (tipo === 'maratona' && c instanceof Maratona) ||
            (tipo === 'trail' && !(c instanceof Maratona));

        if (!incluir) return false;
        if (!busca) return true;

        return c.nome.toLowerCase().includes(busca) ||
               c.local.toLowerCase().includes(busca);
    });

    renderizarTabela(filtradas);
}

function carregarExemplos() {
    const exemplos = [
        new Maratona(proximoId++, 'Maratona SP', '2024-06-15', 'São Paulo', 42),
        new TrailRunning(proximoId++, 'Trail Mantiqueira', '2024-07-20', 'Campos do Jordão', 21),
        new Maratona(proximoId++, 'Maratona RJ', '2024-08-10', 'Rio de Janeiro', 42)
    ];
    competicoes.push(...exemplos);
    salvar();
}

export function buscarPorId(id) {
    carregar();
    return competicoes.find(c => c.id === id) ?? null;
}

export function listar() {
    carregar();
    console.log('listar()', competicoes.length);
    return competicoes;
}

export function contarTotal() {
    carregar();
    return competicoes.length;
}

export function adicionarAtletaCompeticao(idCompeticao, idAtleta) {
    carregar();
    let comp = buscarPorId(idCompeticao);
    if (!comp) return { sucesso: false, mensagem: 'Competição não encontrada!' };

    comp.adicionarAtleta(idAtleta);
    salvar();
    return { sucesso: true };
}

export function carregarDadosExemplo() {
    carregar();
    if (competicoes.length === 0) carregarExemplos();
}
