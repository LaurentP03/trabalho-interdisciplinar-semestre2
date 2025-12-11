let tbody = document.getElementById('corpoTabelaCompeticoes');
let formulario = document.getElementById('formularioCompeticao');
let form = document.getElementById('formCompeticao');
let tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(competicoes) {
    if (!tbody) return;

    if (competicoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Nenhuma competição cadastrada.</td></tr>';
        return;
    }

    let html = '';
    competicoes.forEach(function(c) {
        html = html + '<tr>';
        html = html + '<td>' + c.id + '</td>';
        html = html + '<td>' + c.nome + '</td>';
        html = html + '<td>' + formatarData(c.data) + '</td>';
        html = html + '<td>' + c.local + '</td>';
        html = html + '<td>' + c.distancia + 'km</td>';
        html = html + '<td>' + c.tipoFormatado + '</td>';
        html = html + '<td>' + c.atletas.length + '</td>';
        html = html + '<td>';
        html = html + '<button class="btn-acao btn-editar" data-action="editar" data-id="' + c.id + '">✏️</button>';
        html = html + '<button class="btn-acao btn-excluir" data-action="excluir" data-id="' + c.id + '">🗑️</button>';
        html = html + '</td>';
        html = html + '</tr>';
    });
    
    tbody.innerHTML = html;
}

export function abrirFormulario(modo) {
    if (!formulario) return;
    
    formulario.style.display = 'block';
    
    if (modo === 'editar') {
        tituloFormulario.textContent = 'Editar Competição';
    } else {
        tituloFormulario.textContent = 'Cadastrar Nova Competição';
    }
    
    if (modo === 'criar') {
        if (form) {
            form.reset();
        }
    }
}

export function fecharFormulario() {
    if (formulario) {
        formulario.style.display = 'none';
    }
    if (form) {
        form.reset();
    }
}

export function preencherFormulario(comp, tipo) {
    let competicaoIdElement = document.getElementById('competicaoId');
    let nomeElement = document.getElementById('nome');
    let dataElement = document.getElementById('data');
    let localElement = document.getElementById('local');
    let distanciaElement = document.getElementById('distancia');
    let tipoElement = document.querySelector('input[value="' + tipo + '"]');
    
    if (competicaoIdElement) {
        competicaoIdElement.value = comp.id;
    }
    if (nomeElement) {
        nomeElement.value = comp.nome;
    }
    if (dataElement) {
        dataElement.value = comp.data;
    }
    if (localElement) {
        localElement.value = comp.local;
    }
    if (distanciaElement) {
        distanciaElement.value = comp.distancia;
    }
    if (tipoElement) {
        tipoElement.checked = true;
    }
}

export function obterDadosFormulario() {
    let nomeElement = document.getElementById('nome');
    let dataElement = document.getElementById('data');
    let localElement = document.getElementById('local');
    let distanciaElement = document.getElementById('distancia');
    let tipoElement = document.querySelector('input[name="tipo"]:checked');
    
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

    let partes = data.split('-');
    let ano = parseInt(partes[0]);
    let mes = parseInt(partes[1]);
    let dia = parseInt(partes[2]);

    let hoje = new Date();
    let anoAtual = hoje.getFullYear();
    let mesAtual = hoje.getMonth() + 1;
    let diaAtual = hoje.getDate();

    if (ano < anoAtual) {
        return { valido: false, mensagem: 'O ano da competição não pode ser no passado!' };
    }

    if (ano == anoAtual && mes < mesAtual) {
        return { valido: false, mensagem: 'A data da competição não pode ser no passado!' };
    }

    if (ano == anoAtual && mes == mesAtual && dia < diaAtual) {
        return { valido: false, mensagem: 'A data da competição não pode ser no passado!' };
    }

    if (ano > 2050) {
        return { valido: false, mensagem: 'O ano deve ser até 2050!' };
    }

    if (mes < 1 || mes > 12) {
        return { valido: false, mensagem: 'Mês inválido!' };
    }

    if (dia < 1 || dia > 31) {
        return { valido: false, mensagem: 'Dia inválido!' };
    }

    if (mes == 2) {
        let bissexto = (ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0);
        if (bissexto && dia > 29) {
            return { valido: false, mensagem: 'Fevereiro só tem 29 dias em ano bissexto!' };
        }
        if (!bissexto && dia > 28) {
            return { valido: false, mensagem: 'Fevereiro só tem 28 dias!' };
        }
    }

    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
        return { valido: false, mensagem: 'Este mês só tem 30 dias!' };
    }

    return { valido: true };
}

export function mostrarMensagem(msg, tipo) {
    alert(msg);
}

function formatarData(data) {
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let dia = partes[2];
    return dia + '/' + mes + '/' + ano;
}