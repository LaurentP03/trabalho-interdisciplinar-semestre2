let inputCompeticao = document.getElementById('buscaCompeticao');
let inputAtleta = document.getElementById('buscaAtleta');
let listaCompeticoes = document.getElementById('listaCompeticoes');
let listaAtletas = document.getElementById('listaAtletas');
let mensagemEl = document.getElementById('mensagemInscricao');

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
    competicoes.forEach(function(c) {
        let data = formatarData(c.data);
        html = html + '<div class="lista-item" data-id="' + c.id + '" data-tipo="competicao">';
        html = html + '<strong>' + c.nome + '</strong>';
        html = html + '<span>' + c.tipoFormatado + ' - ' + data + ' - ' + c.local + '</span>';
        html = html + '</div>';
    });
    
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
    atletas.forEach(function(a) {
        html = html + '<div class="lista-item" data-id="' + a.id + '" data-tipo="atleta">';
        html = html + '<strong>' + a.nome + '</strong>';
        html = html + '<span>CPF: ' + a.cpf + '</span>';
        html = html + '</div>';
    });
    
    listaAtletas.innerHTML = html;
    listaAtletas.style.display = 'block';
    console.log('Lista de atletas exibida');
}

export function selecionarCompeticao(comp) {
    competicaoSelecionada = comp;
    if (inputCompeticao) {
        inputCompeticao.value = comp.nome + ' - ' + comp.tipoFormatado;
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
    let idCompeticao = competicaoSelecionada ? competicaoSelecionada.id : null;
    let idAtleta = atletaSelecionado ? atletaSelecionado.id : null;
    
    return {
        idCompeticao: idCompeticao,
        idAtleta: idAtleta
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
    if (!data) return '';
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let dia = partes[2];
    return dia + '/' + mes + '/' + ano;
}