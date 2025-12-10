import { Atleta } from '../models/Atleta.js';
import { renderizarTabela, abrirFormulario, fecharFormulario, preencherFormulario, obterDadosFormulario, mostrarMensagem, configurarMascaraCPF } from '../views/atletasView.js';

let atletas = [];
let proximoId = 1;
let modoEdicao = false;
let idEmEdicao = null;
let carregado = false;

function salvar() {
    try {
        const dados = JSON.stringify(atletas.map(a => ({
            id: a.id, nome: a.nome, cpf: a.cpf, dataNascimento: a.dataNascimento
        })));
        localStorage.setItem('atletas', dados);
        localStorage.setItem('atletasId', proximoId.toString());
    } catch (error) {
        console.error('Erro ao salvar atletas:', error);
    }
}

function carregar() {
    if (carregado) return;
    
    try {
        const dados = localStorage.getItem('atletas');
        if (dados) {
            atletas = JSON.parse(dados).map(a => new Atleta(a.id, a.nome, a.cpf, a.dataNascimento));
            const id = localStorage.getItem('atletasId');
            proximoId = id ? parseInt(id) : 1;
            carregado = true;
            console.log('✓ Atletas carregados do localStorage:', atletas.length);
        }
    } catch (error) {
        console.error('Erro ao carregar atletas:', error);
    }
}

export function inicializar() {
    carregar();
    if (atletas.length === 0) carregarExemplos();
    configurarEventos();
    configurarMascaraCPF();
    renderizarTabela(atletas);
}

function configurarEventos() {
    document.getElementById('btnNovoAtleta')?.addEventListener('click', () => {
        modoEdicao = false;
        idEmEdicao = null;
        abrirFormulario('criar');
    });

    document.getElementById('btnCancelar')?.addEventListener('click', () => fecharFormulario());

    document.getElementById('formAtleta')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const dados = obterDadosFormulario();

        if (modoEdicao) {
            const atleta = atletas.find(a => a.id === idEmEdicao);
            if (atleta) {
                atleta.nome = dados.nome;
                atleta.dataNascimento = dados.dataNascimento;
                salvar();
                mostrarMensagem('Atleta atualizado!');
            }
        } else {
            if (atletas.find(a => a.cpf === dados.cpf)) {
                mostrarMensagem('CPF já cadastrado!', 'erro');
                return;
            }
            atletas.push(new Atleta(proximoId++, dados.nome, dados.cpf, dados.dataNascimento));
            salvar();
            mostrarMensagem('Atleta cadastrado!');
        }
        fecharFormulario();
        renderizarTabela(atletas);
    });

    document.getElementById('campoBusca')?.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase().trim();
        if (!termo) {
            renderizarTabela(atletas);
            return;
        }
        const filtrados = atletas.filter(a => 
            a.nome.toLowerCase().includes(termo) || 
            a.cpf.includes(termo)
        );
        renderizarTabela(filtrados);
    });

    document.getElementById('corpoTabelaAtletas')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = parseInt(btn.dataset.id);
        
        if (btn.dataset.action === 'editar') {
            const atleta = atletas.find(a => a.id === id);
            if (atleta) {
                modoEdicao = true;
                idEmEdicao = id;
                abrirFormulario('editar');
                preencherFormulario(atleta);
            }
        } else if (btn.dataset.action === 'excluir') {
            if (confirm('Excluir atleta?')) {
                atletas = atletas.filter(a => a.id !== id);
                salvar();
                mostrarMensagem('Atleta excluído!');
                renderizarTabela(atletas);
            }
        }
    });
}

function carregarExemplos() {
    [
        { nome: 'João Silva', cpf: '123.456.789-00', dataNascimento: '1990-05-15' },
        { nome: 'Maria Santos', cpf: '987.654.321-00', dataNascimento: '1985-08-20' },
        { nome: 'Pedro Costa', cpf: '456.789.123-00', dataNascimento: '2005-03-10' }
    ].forEach(d => atletas.push(new Atleta(proximoId++, d.nome, d.cpf, d.dataNascimento)));
    salvar();
}

export function buscarPorId(id) {
    carregar();
    return atletas.find(a => a.id === id);
}

export function listar() {
    carregar();
    console.log('listar() chamado - retornando', atletas.length, 'atletas');
    return atletas;
}

export function contarTotal() {
    carregar();
    return atletas.length;
}

export function carregarDadosExemplo() {
    carregar();
    if (atletas.length === 0) carregarExemplos();
}