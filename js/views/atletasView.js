const tbody = document.getElementById('corpoTabelaAtletas');
const formulario = document.getElementById('formularioAtleta');
const form = document.getElementById('formAtleta');
const tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(atletas) {
    if (!tbody) return;

    if (atletas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum atleta encontrado.</td></tr>';
        return;
    }

    tbody.innerHTML = atletas.map(a => `
        <tr>
            <td>${a.id}</td>
            <td>${a.nome}</td>
            <td>${a.cpf}</td>
            <td>${formatarData(a.dataNascimento)}</td>
            <td>
                <button class="btn-acao btn-editar" data-action="editar" data-id="${a.id}">✏️</button>
                <button class="btn-acao btn-excluir" data-action="excluir" data-id="${a.id}">🗑️</button>
            </td>
        </tr>
    `).join('');
}

export function abrirFormulario(modo) {
    if (!formulario) return;
    formulario.style.display = 'block';
    tituloFormulario.textContent = modo === 'editar' ? 'Editar Atleta' : 'Cadastrar Novo Atleta';
    if (modo === 'criar') {
        form?.reset();
        document.getElementById('cpf').disabled = false;
    }
}

export function fecharFormulario() {
    if (formulario) formulario.style.display = 'none';
    form?.reset();
}

export function preencherFormulario(atleta) {
    document.getElementById('atletaId').value = atleta.id;
    document.getElementById('nome').value = atleta.nome;
    document.getElementById('cpf').value = atleta.cpf;
    document.getElementById('cpf').disabled = true;
    document.getElementById('dataNascimento').value = atleta.dataNascimento;
    document.getElementById('btnSalvar').textContent = 'Atualizar';
}

export function obterDadosFormulario() {
    return {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        dataNascimento: document.getElementById('dataNascimento').value
    };
}

export function mostrarMensagem(msg) {
    alert(msg);
}

function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

export function configurarMascaraCPF() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = valor;
            }
        });
    }
}