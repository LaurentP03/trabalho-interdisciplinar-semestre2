import { cadastrarCompeticao, vetCompeticoes } from "../controllers/CompeticaoController.js";


const nome = document.getElementById('nome');
const categoria = document.getElementById('categoria');
const data = document.getElementById('data');
const distancia = document.getElementById('distancia');
const limiteAtletas = document.getElementById('limiteAtletas');
const local = document.getElementById('local');
const descricaoGeral = document.getElementById('descricaoGeral');
const btnCadastrar = document.getElementById('btnCadastrar');
const outMSG = document.getElementById('outMSG');

btnCadastrar.addEventListener("click", function () {

    let nome = nome.value;
    let categoria = categoria.value;
    let data = data.value;
    let distancia = distancia.value;
    let limiteAtletas = limiteAtletas.value;
    let local = local.value;
    let descricaoGeral = descricaoGeral.value;

    let competicaoCadastrada = cadastrarCompeticao(nome, data, local, distancia, limiteAtletas, categoria, descricaoGeral);

    if (!competicaoCadastrada) {
        outMSG.textContent = "Já existe uma competição com esse nome. Tente outro nome.";
        nome.focus();
    } else {
        outMSG.textContent = "Competição cadastrada com sucesso!";
    }

});