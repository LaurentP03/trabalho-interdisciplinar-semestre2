import Competicao from './models/Competicao.js';
import Competicao from './models/Atleta.js';

const nome = document.getElementById('nome');
const categoria = document.getElementById('categoria');
const data = document.getElementById('data');
const distancia = document.getElementById('distancia');
const limiteAtletas = document.getElementById('limiteAtletas');
const local = document.getElementById('local');
const descricaoGeral = document.getElementById('descricaoGeral');
const btnCadastrar = document.getElementById('btnCadastrar');

const vetCompeticoes = [];

/* btnCadastrar.addEventListener("click", function(){



}); */


function cadastrarCompeticao(nomeParaAdd, data, local, distanciaKm, limiteAtletas, tipo, /* organizador, */ descricao) {

    var competicaoExiste = false; 

    for (let i = 0; i < vetCompeticoes.length; i++) {
        const posicaoVetor = vetCompeticoes[i];

        if (posicaoVetor.nome === nomeParaAdd) {

            competicaoExiste = true;
            return false;

        } else {

            novaCompeticao = new Competicao(nomeParaAdd, data, local, distanciaKm, limiteAtletas, tipo, descricao);
            vetCompeticoes.push(novaCompeticao);
            return true; //foi verificado todo o vetor e n existe competicao com esse nome e vai ser adicionada
        }

    }

}

    function adicionarCompetidor(competidorCPF, competicaoNome) {
        
       /*  if () {
            
        } */

    }

    export { cadastrarCompeticao, vetorCompeticoes };