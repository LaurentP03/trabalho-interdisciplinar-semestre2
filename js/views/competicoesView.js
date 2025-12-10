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
            <td>${c.tipoFormatado}</td>
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
    if (modo === 'criar') {
        if (form) {
            form.reset();
        }
    }
}

export function fecharFormulario() {
    if (formulario) formulario.style.display = 'none';
    if (form) {
        form.reset();
    }
}

export function preencherFormulario(comp, tipo) {
    const competicaoIdElement = document.getElementById('competicaoId');
    const nomeElement = document.getElementById('nome');
    const dataElement = document.getElementById('data');
    const localElement = document.getElementById('local');
    const distanciaElement = document.getElementById('distancia');
    const tipoElement = document.querySelector(`input[value="${tipo}"]`);
    
    if (competicaoIdElement) competicaoIdElement.value = comp.id;
    if (nomeElement) nomeElement.value = comp.nome;
    if (dataElement) dataElement.value = comp.data;
    if (localElement) localElement.value = comp.local;
    if (distanciaElement) distanciaElement.value = comp.distancia;
    if (tipoElement) tipoElement.checked = true;
}

export function obterDadosFormulario() {
    const nomeElement = document.getElementById('nome');
    const dataElement = document.getElementById('data');
    const localElement = document.getElementById('local');
    const distanciaElement = document.getElementById('distancia');
    const tipoElement = document.querySelector('input[name="tipo"]:checked');
    
    return {
        nome: nomeElement ? nomeElement.value : '',
        data: dataElement ? dataElement.value : '',
        local: localElement ? localElement.value : '',
        distancia: distanciaElement ? parseFloat(distanciaElement.value) : 0,
        tipo: tipoElement ? tipoElement.value : ''
    };
}

export function validarDataCompeticao(data) {
    if (!data) {
        return { valido: false, mensagem: 'Data da competição é obrigatória!' };
    }

    const partes = data.split('-');
    if (partes.length !== 3) {
        return { valido: false, mensagem: 'Formato de data inválido!' };
    }

    const ano = partes[0];
    const mes = parseInt(partes[1]);
    const dia = parseInt(partes[2]);

    if (ano.length !== 4 || isNaN(parseInt(ano))) {
        return { valido: false, mensagem: 'O ano deve ter exatamente 4 dígitos!' };
    }

    const anoNumero = parseInt(ano);

    if (anoNumero < 2025) {
        return { valido: false, mensagem: 'O ano da competição deve ser 2025 ou posterior!' };
    }

    if (mes < 1 || mes > 12) {
        return { valido: false, mensagem: 'Mês inválido!' };
    }

    if (dia < 1 || dia > 31) {
        return { valido: false, mensagem: 'Dia inválido!' };
    }

    return { valido: true };
}

export function mostrarMensagem(msg, tipo = 'sucesso') {
    alert(msg);
}

function formatarData(data) {
    const partes = data.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}/${ano}`;
}