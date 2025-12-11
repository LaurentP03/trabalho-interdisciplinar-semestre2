import { Maratona } from '../models/Maratona.js';

const tbody = document.getElementById('corpoTabelaCompeticoes');
const formulario = document.getElementById('formularioCompeticao');
const form = document.getElementById('formCompeticao');
const tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(competicoes) {
    if (!tbody) {
        return;
    }

    if (competicoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">Nenhuma competição cadastrada.</td></tr>';
        return;
    }

    let html = '';
    let i = 0;
    
    while (i < competicoes.length) {
        let c = competicoes[i];
        let dataFormatada = formatarData(c.data);
        let tipo = '';
        
        if (c instanceof Maratona) {
            tipo = '🏃 Maratona';
        } else {
            tipo = '⛰️ Trail Running';
        }
        
        html = html + '<tr>';
        html = html + '<td>' + c.id + '</td>';
        html = html + '<td>' + c.nome + '</td>';
        html = html + '<td>' + dataFormatada + '</td>';
        html = html + '<td>' + c.local + '</td>';
        html = html + '<td>' + c.distancia + 'km</td>';
        html = html + '<td>' + tipo + '</td>';
        html = html + '<td>' + c.atletas.length + '</td>';
        html = html + '<td>';
        html = html + '<button class="btn-acao btn-editar" data-action="editar" data-id="' + c.id + '">✏️</button>';
        html = html + '<button class="btn-acao btn-excluir" data-action="excluir" data-id="' + c.id + '">🗑️</button>';
        html = html + '</td>';
        html = html + '</tr>';
        
        i = i + 1;
    }
    
    tbody.innerHTML = html;
}

export function abrirFormulario(modo) {
    if (!formulario) {
        return;
    }
    
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
    let idInput = document.getElementById('competicaoId');
    if (idInput) {
        idInput.value = comp.id;
    }
    
    let nomeInput = document.getElementById('nome');
    if (nomeInput) {
        nomeInput.value = comp.nome;
    }
    
    let dataInput = document.getElementById('data');
    if (dataInput) {
        dataInput.value = comp.data;
    }
    
    let localInput = document.getElementById('local');
    if (localInput) {
        localInput.value = comp.local;
    }
    
    let distanciaInput = document.getElementById('distancia');
    if (distanciaInput) {
        distanciaInput.value = comp.distancia;
    }
    
    let radioInput = document.querySelector('input[value="' + tipo + '"]');
    if (radioInput) {
        radioInput.checked = true;
    }
}

export function obterDadosFormulario() {
    let dados = {
        nome: '',
        data: '',
        local: '',
        distancia: 0,
        tipo: ''
    };
    
    let nomeInput = document.getElementById('nome');
    if (nomeInput) {
        dados.nome = nomeInput.value;
    }
    
    let dataInput = document.getElementById('data');
    if (dataInput) {
        dados.data = dataInput.value;
    }
    
    let localInput = document.getElementById('local');
    if (localInput) {
        dados.local = localInput.value;
    }
    
    let distanciaInput = document.getElementById('distancia');
    if (distanciaInput) {
        dados.distancia = parseFloat(distanciaInput.value);
    }
    
    let radioSelecionado = document.querySelector('input[name="tipo"]:checked');
    if (radioSelecionado) {
        dados.tipo = radioSelecionado.value;
    }
    
    return dados;
}

export function mostrarMensagem(msg) {
    alert(msg);
}

function formatarData(data) {
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let dia = partes[2];
    
    return dia + '/' + mes + '/' + ano;
}