import { competicaoController } from './CompeticaoController.js';
import { atletaController } from './AtletaController.js';
import { inscricoesController } from './InscricoesController.js';

export function init() {
    // ligar botões
    var btnCadComp = document.getElementById('btnCadastrarCompeticao');
    var btnCadAtleta = document.getElementById('btnCadastrarAtleta');
    var btnInscrever = document.getElementById('btnInscreverAtleta');

    btnCadComp.onclick = function () {
        cadastrarCompeticao();
    };

    btnCadAtleta.onclick = function () {
        cadastrarAtleta();
    };

    btnInscrever.onclick = function () {
        processarInscricao();
    };

    // carregar listas iniciais
    atualizarListas();
}

function mostrarMensagem(idElemento, mensagem, tipo) {
    var el = document.getElementById(idElemento);
    el.textContent = mensagem;
    if (tipo === "success") {
        el.className = "message success show";
    } else {
        el.className = "message error show";
    }
    // oculta depois de 3s
    setTimeout(function () {
        el.className = "message";
    }, 3000);
}

function limparCamposCompeticao() {
    document.getElementById('compNome').value = "";
    document.getElementById('compData').value = "";
    document.getElementById('compLocal').value = "";
    document.getElementById('compDistancia').value = "";
    document.getElementById('compTipo').value = "";
}

function limparCamposAtleta() {
    document.getElementById('atlNome').value = "";
    document.getElementById('atlCpf').value = "";
    document.getElementById('atlDataNasc').value = "";
}

export function cadastrarCompeticao() {
    var tipo = document.getElementById('compTipo').value;
    var nome = document.getElementById('compNome').value;
    var data = document.getElementById('compData').value;
    var local = document.getElementById('compLocal').value;
    var distancia = document.getElementById('compDistancia').value;
    var pontosAgua = document.getElementById('paradasAgua').value;
    var tipoTerreno = document.getElementById('tipoTerreno').value;

    var valido = true;

    if (tipo === "") {
        mostrarMensagem('msgCompeticao', 'Selecione o tipo da competição.', 'error');
        valido = false;
    }
    if (nome === "") {
        mostrarMensagem('msgCompeticao', 'Informe o nome.', 'error');
        valido = false;
    }
    if (data === "") {
        mostrarMensagem('msgCompeticao', 'Informe a data.', 'error');
        valido = false;
    }

    if (valido === true) {
        //chamada(única)
        var ok = competicaoController.cadastrar(tipo, nome, data, local, distancia, pontosAgua, tipoTerreno);

        if (ok === true) {
            mostrarMensagem('msgCompeticao', 'Competição cadastrada com sucesso.', 'success');
            limparCamposCompeticao();
            atualizarListas();
        } else {
            mostrarMensagem('msgCompeticao', 'Erro ao cadastrar competição.', 'error');
        }
    }
}

export function cadastrarAtleta() {
    var nome = document.getElementById('atlNome').value;
    var cpf = document.getElementById('atlCpf').value;
    var dataN = document.getElementById('atlDataNasc').value;

    var valido = true;
    if (nome === "") {
        mostrarMensagem('msgAtleta', 'Informe o nome.', 'error');
        valido = false;
    }
    if (cpf === "") {
        mostrarMensagem('msgAtleta', 'Informe o CPF.', 'error');
        valido = false;
    }

    if (valido === true) {
        var ok = atletaController.cadastrar(nome, cpf, dataN);
        if (ok === true) {
            mostrarMensagem('msgAtleta', 'Atleta cadastrado com sucesso.', 'success');
            limparCamposAtleta();
            atualizarListas();
        } else {
            mostrarMensagem('msgAtleta', 'Erro ao cadastrar atleta.', 'error');
        }
    }
}

export function processarInscricao() {
    var nomeComp = document.getElementById('inscCompeticao').value;
    var cpfAtleta = document.getElementById('inscAtleta').value;

    var valido = true;

    if (nomeComp === "") {
        mostrarMensagem('msgInscricao', 'Selecione a competição.', 'error');
        valido = false;
    }

    if (cpfAtleta === "") {
        mostrarMensagem('msgInscricao', 'Selecione o atleta.', 'error');
        valido = false;
    }

    if (valido === true) {

        var resultado = inscricoesController.inscrever(nomeComp, cpfAtleta);

        if (resultado.sucesso === true) {
            mostrarMensagem('msgInscricao', resultado.mensagem, 'success');
            atualizarListas();
        } else {
            mostrarMensagem('msgInscricao', resultado.mensagem, 'error');
        }
    }
}


function atualizarListas() {
    renderizarCompeticoes();
    renderizarAtletas();
    popularSelects();
}

export function renderizarCompeticoes() {
    var lista = competicaoController.listar();
    var container = document.getElementById('listaCompeticoes');
    container.innerHTML = "";

    for (var i = 0; i < lista.length; i++) {
        var c = lista[i];

        var div = document.createElement('div');
        div.className = 'list-item';

        // usa toString da competição
        var p = document.createElement('p');
        p.textContent = c.toString();
        div.appendChild(p);

        // lista de atletas inscritos
        var ul = document.createElement('ul');
        ul.className = 'atletas-inscritos';

        for (var j = 0; j < c.atletas.length; j++) {
            var li = document.createElement('li');
            li.textContent = c.atletas[j].nome + " (" + c.atletas[j].cpf + ")";
            ul.appendChild(li);
        }

        div.appendChild(ul);
        container.appendChild(div);
    }
}

export function renderizarAtletas() {
    var lista = atletaController.listar();
    var container = document.getElementById('listaAtletas');
    container.innerHTML = "";

    for (var i = 0; i < lista.length; i++) {
        var a = lista[i];
        var div = document.createElement('div');
        div.className = 'list-item';

        var h3 = document.createElement('h3');
        h3.textContent = a.nome;
        div.appendChild(h3);

        var p = document.createElement('p');
        p.textContent = "CPF: " + a.cpf + " - Nasc: " + a.dataNascimento;
        div.appendChild(p);

        container.appendChild(div);
    }
}

function popularSelects() {
    var comps = competicaoController.listar();
    var atletas = atletaController.listar();

    var selComp = document.getElementById('inscCompeticao');
    var selAtleta = document.getElementById('inscAtleta');

    selComp.innerHTML = "<option value=''>Selecione a competição...</option>";
    selAtleta.innerHTML = "<option value=''>Selecione o atleta...</option>";

    for (var i = 0; i < comps.length; i++) {
        var opt = document.createElement('option');
        opt.value = comps[i].nome;
        opt.textContent = comps[i].nome;
        selComp.appendChild(opt);
    }

    for (var j = 0; j < atletas.length; j++) {
        var opt2 = document.createElement('option');
        opt2.value = atletas[j].cpf;
        opt2.textContent = atletas[j].nome + " (" + atletas[j].cpf + ")";
        selAtleta.appendChild(opt2);
    }
}
