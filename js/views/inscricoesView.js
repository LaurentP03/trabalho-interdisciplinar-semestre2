import { Maratona } from '../models/Maratona.js';

const inputCompeticao = document.getElementById('buscaCompeticao');
const inputAtleta = document.getElementById('buscaAtleta');
const listaCompeticoes = document.getElementById('listaCompeticoes');
const listaAtletas = document.getElementById('listaAtletas');
const mensagemEl = document.getElementById('mensagemInscricao');

let competicaoSelecionada = null;
let atletaSelecionado = null;

export function renderizarCompeticoes(competicoes) {
    console.log('Renderizando competições:', competicoes);
    
    if (!listaCompeticoes) {
        console.error('Elemento listaCompeticoes não encontrado!');
        return;
    }

    if (competicoes.length === 0) {
        listaCompeticoes.innerHTML = '<div class="lista-item-vazio">Nenhuma competição encontrada</div>';
        listaCompeticoes.style.display = 'block';
        return;
    }

    let html = '';
    let i = 0;
    
    while (i < competicoes.length) {
        let c = competicoes[i];
        let tipo = '';
        
        if (c instanceof Maratona) {
            tipo = 'Maratona';
        } else {
            tipo = 'Trail Running';
        }
        
        let data = formatarData(c.data);
        
        html = html + '<div class="lista-item" data-id="' + c.id + '" data-tipo="competicao">';
        html = html + '<strong>' + c.nome + '</strong>';
        html = html + '<span>' + tipo + ' - ' + data + ' - ' + c.local + '</span>';
        html = html + '</div>';
        
        i = i + 1;
    }
    
    listaCompeticoes.innerHTML = html;
    listaCompeticoes.style.display = 'block';
    console.log('Lista de competições exibida');
}

export function renderizarAtletas(atletas) {
    console.log('Renderizando atletas:', atletas);
    
    if (!listaAtletas) {
        console.error('Elemento listaAtletas não encontrado!');
        return;
    }

    if (atletas.length === 0) {
        listaAtletas.innerHTML = '<div class="lista-item-vazio">Nenhum atleta encontrado</div>';
        listaAtletas.style.display = 'block';
        return;
    }

    let html = '';
    let i = 0;
    
    while (i < atletas.length) {
        let a = atletas[i];
        
        html = html + '<div class="lista-item" data-id="' + a.id + '" data-tipo="atleta">';
        html = html + '<strong>' + a.nome + '</strong>';
        html = html + '<span>CPF: ' + a.cpf + '</span>';
        html = html + '</div>';
        
        i = i + 1;
    }
    
    listaAtletas.innerHTML = html;
    listaAtletas.style.display = 'block';
    console.log('Lista de atletas exibida');
}

export function selecionarCompeticao(comp) {
    competicaoSelecionada = comp;
    
    let tipo = '';
    if (comp instanceof Maratona) {
        tipo = 'Maratona';
    } else {
        tipo = 'Trail Running';
    }
    
    if (inputCompeticao) {
        inputCompeticao.value = comp.nome + ' - ' + tipo;
    }
    
    if (listaCompeticoes) {
        listaCompeticoes.style.display = 'none';
    }
}

export function selecionarAtleta(atleta) {
    atletaSelecionado = atleta;
    
    if (inputAtleta) {
        inputAtleta.value = atleta.nome + ' - ' + atleta.cpf;
    }
    
    if (listaAtletas) {
        listaAtletas.style.display = 'none';
    }
}

export function obterSelecao() {
    let idComp = null;
    let idAtl = null;
    
    if (competicaoSelecionada) {
        idComp = competicaoSelecionada.id;
    }
    
    if (atletaSelecionado) {
        idAtl = atletaSelecionado.id;
    }
    
    return {
        idCompeticao: idComp,
        idAtleta: idAtl
    };
}

export function limparSelecao() {
    competicaoSelecionada = null;
    atletaSelecionado = null;
    
    if (inputCompeticao) {
        inputCompeticao.value = '';
    }
    
    if (inputAtleta) {
        inputAtleta.value = '';
    }
    
    esconderListas();
}

export function esconderListas() {
    if (listaCompeticoes) {
        listaCompeticoes.style.display = 'none';
    }
    
    if (listaAtletas) {
        listaAtletas.style.display = 'none';
    }
}

export function mostrarMensagem(texto, tipo) {
    if (!tipo) {
        tipo = 'sucesso';
    }
    
    if (!mensagemEl) {
        alert(texto);
        return;
    }

    mensagemEl.textContent = texto;
    mensagemEl.className = 'mensagem ' + tipo;
    mensagemEl.style.display = 'block';

    setTimeout(function() {
        mensagemEl.style.display = 'none';
    }, 3000);
}

function formatarData(data) {
    if (!data) {
        return '';
    }
    
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let dia = partes[2];
    
    return dia + '/' + mes + '/' + ano;
}