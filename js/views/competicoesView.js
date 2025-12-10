import { Maratona } from '../models/Maratona.js';

const tbody = document.getElementById('corpoTabelaCompeticoes');
const formulario = document.getElementById('formularioCompeticao');
const form = document.getElementById('formCompeticao');
const tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(competicoes) {
    if (!tbody) return;

    if (competicoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Nenhuma competição cadastrada.</td></tr>';
        return;
    }

    tbody.innerHTML = competicoes.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>${c.nome}</td>
            <td>${formatarData(c.data)}</td>
            <td>${c.local}</td>
            <td>${c.distancia}km</td>
            <td>${c instanceof Maratona ? '🏃 Maratona' : '⛰️ Trail Running'}</td>
            <td>${c.atletas.length}</td>
            <td>
                <button class="btn-acao btn-editar" data-action="editar" data-id="${c.id}">✏️</button>
                <button class="btn-acao btn-excluir" data-action="excluir" data-id="${c.id}">🗑️</button>
            </td>
        </tr>
    `).join('');
}

export function abrirFormulario(modo) {
    if (!formulario) return;
    formulario.style.display = 'block';
    tituloFormulario.textContent = modo === 'editar' ? 'Editar Competição' : 'Cadastrar Nova Competição';
    if (modo === 'criar') form?.reset();
}

export function fecharFormulario() {
    if (formulario) formulario.style.display = 'none';
    form?.reset();
}

export function preencherFormulario(comp, tipo) {
    document.getElementById('competicaoId').value = comp.id;
    document.getElementById('nome').value = comp.nome;
    document.getElementById('data').value = comp.data;
    document.getElementById('local').value = comp.local;
    document.getElementById('distancia').value = comp.distancia;
    document.querySelector(`input[value="${tipo}"]`).checked = true;
}

export function obterDadosFormulario() {
    return {
        nome: document.getElementById('nome').value,
        data: document.getElementById('data').value,
        local: document.getElementById('local').value,
        distancia: parseFloat(document.getElementById('distancia').value),
        tipo: document.querySelector('input[name="tipo"]:checked')?.value
    };
}

export function mostrarMensagem(msg) {
    alert(msg);
}

function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}