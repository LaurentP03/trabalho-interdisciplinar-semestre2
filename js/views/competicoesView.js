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

export function configurarValidacaoData(idCampo, tipo) {
    const inputData = document.getElementById(idCampo);
    if (!inputData) return;

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const diaAtual = String(dataAtual.getDate()).padStart(2, '0');
    const dataHoje = `${anoAtual}-${mesAtual}-${diaAtual}`;

    if (tipo === 'nascimento') {
        inputData.setAttribute('min', '1900-01-01');
        inputData.setAttribute('max', dataHoje);
    } else if (tipo === 'competicao') {
        inputData.setAttribute('min', '2000-01-01');
        inputData.setAttribute('max', `${anoAtual + 5}-12-31`);
    }

    inputData.addEventListener('input', (e) => {
        const valor = e.target.value;
        if (valor.length === 10) {
            const partes = valor.split('-');
            const ano = Number(partes[0]);
            
            if (ano.toString().length > 4) {
                e.target.value = '';
                alert('Ano inválido! Use formato de 4 dígitos.');
            }
        }
    });

    inputData.addEventListener('blur', (e) => {
        const valor = e.target.value;
        if (!valor) return;

        const partes = valor.split('-');
        const ano = Number(partes[0]);
        const mes = Number(partes[1]);
        const dia = Number(partes[2]);
        
        if (ano.toString().length !== 4) {
            alert('Ano deve ter exatamente 4 dígitos!');
            e.target.value = '';
            return;
        }

        if (tipo === 'nascimento') {
            if (ano < 1900 || ano > anoAtual) {
                alert(`Ano deve estar entre 1900 e ${anoAtual}!`);
                e.target.value = '';
                return;
            }

            const dataNascimento = new Date(ano, mes - 1, dia);
            if (dataNascimento > dataAtual) {
                alert('Data de nascimento não pode ser futura!');
                e.target.value = '';
            }
        } else if (tipo === 'competicao') {
            if (ano < 2000 || ano > anoAtual + 5) {
                alert(`Ano deve estar entre 2000 e ${anoAtual + 5}!`);
                e.target.value = '';
            }
        }
    });

    inputData.addEventListener('keydown', (e) => {
        const teclas = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];
        if (teclas.includes(e.key)) {
            return;
        }
        
        if (e.target.value.length >= 10 && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
        }
    });
}