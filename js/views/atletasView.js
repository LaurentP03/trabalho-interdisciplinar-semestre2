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
        if (form) {
            form.reset();
        }
        const cpfElement = document.getElementById('cpf');
        if (cpfElement) {
            cpfElement.disabled = false;
        }
    }
}

export function fecharFormulario() {
    if (formulario) formulario.style.display = 'none';
    if (form) {
        form.reset();
    }
}

export function preencherFormulario(atleta) {
    const atletaIdElement = document.getElementById('atletaId');
    const nomeElement = document.getElementById('nome');
    const cpfElement = document.getElementById('cpf');
    const dataNascimentoElement = document.getElementById('dataNascimento');
    const btnSalvarElement = document.getElementById('btnSalvar');
    
    if (atletaIdElement) atletaIdElement.value = atleta.id;
    if (nomeElement) nomeElement.value = atleta.nome;
    if (cpfElement) {
        cpfElement.value = atleta.cpf;
        cpfElement.disabled = true;
    }
    if (dataNascimentoElement) dataNascimentoElement.value = atleta.dataNascimento;
    if (btnSalvarElement) btnSalvarElement.textContent = 'Atualizar';
}

export function obterDadosFormulario() {
    const nomeElement = document.getElementById('nome');
    const cpfElement = document.getElementById('cpf');
    const dataNascimentoElement = document.getElementById('dataNascimento');
    
    return {
        nome: nomeElement ? nomeElement.value : '',
        cpf: cpfElement ? cpfElement.value : '',
        dataNascimento: dataNascimentoElement ? dataNascimentoElement.value : ''
    };
}

export function validarDataNascimento(data) {
    if (!data) {
        return { valido: false, mensagem: 'Data de nascimento é obrigatória!' };
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

    if (anoNumero > 2025) {
        return { valido: false, mensagem: 'A data de nascimento não pode ser posterior a 2025!' };
    }

    if (anoNumero < 1900) {
        return { valido: false, mensagem: 'O ano deve ser 1900 ou posterior!' };
    }

    if (mes < 1 || mes > 12) {
        return { valido: false, mensagem: 'Mês inválido!' };
    }

    if (dia < 1 || dia > 31) {
        return { valido: false, mensagem: 'Dia inválido!' };
    }

    const dataInformada = new Date(anoNumero, mes - 1, dia);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataInformada > dataAtual) {
        return { valido: false, mensagem: 'A data de nascimento não pode ser futura!' };
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