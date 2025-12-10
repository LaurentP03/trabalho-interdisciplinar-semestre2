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

    const html = competicoes.map(c => {
        const data = formatarData(c.data);
        return `
            <div class="lista-item" data-id="${c.id}" data-tipo="competicao">
                <strong>${c.nome}</strong>
                <span>${c.tipoFormatado} - ${data} - ${c.local}</span>
            </div>
        `;
    }).join('');
    
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

    const html = atletas.map(a => `
        <div class="lista-item" data-id="${a.id}" data-tipo="atleta">
            <strong>${a.nome}</strong>
            <span>CPF: ${a.cpf}</span>
        </div>
    `).join('');
    
    listaAtletas.innerHTML = html;
    listaAtletas.style.display = 'block';
    console.log('Lista de atletas exibida');
}

export function selecionarCompeticao(comp) {
    competicaoSelecionada = comp;
    if (inputCompeticao) {
        inputCompeticao.value = `${comp.nome} - ${comp.tipoFormatado}`;
    }
    if (listaCompeticoes) {
        listaCompeticoes.style.display = 'none';
    }
}

export function selecionarAtleta(atleta) {
    atletaSelecionado = atleta;
    if (inputAtleta) {
        inputAtleta.value = `${atleta.nome} - ${atleta.cpf}`;
    }
    if (listaAtletas) {
        listaAtletas.style.display = 'none';
    }
}

export function obterSelecao() {
    const idCompeticao = competicaoSelecionada ? competicaoSelecionada.id : null;
    const idAtleta = atletaSelecionado ? atletaSelecionado.id : null;
    
    return {
        idCompeticao: idCompeticao,
        idAtleta: idAtleta
    };
}

export function limparSelecao() {
    competicaoSelecionada = null;
    atletaSelecionado = null;
    if (inputCompeticao) inputCompeticao.value = '';
    if (inputAtleta) inputAtleta.value = '';
    esconderListas();
}

export function esconderListas() {
    if (listaCompeticoes) listaCompeticoes.style.display = 'none';
    if (listaAtletas) listaAtletas.style.display = 'none';
}

export function mostrarMensagem(texto, tipo = 'sucesso') {
    if (!mensagemEl) {
        alert(texto);
        return;
    }

    mensagemEl.textContent = texto;
    mensagemEl.className = `mensagem ${tipo}`;
    mensagemEl.style.display = 'block';

    setTimeout(() => {
        mensagemEl.style.display = 'none';
    }, 3000);
}

function formatarData(data) {
    if (!data) return '';
    const partes = data.split('-');
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}/${ano}`;
}