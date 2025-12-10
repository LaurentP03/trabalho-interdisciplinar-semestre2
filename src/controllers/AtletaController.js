import Competicao from './models/Competicao.js';
import Competicao from './models/Atleta.js';

const inNomeAtleta = document.getElementById('inNomeAtleta');
const inEmail = document.getElementById('inEmail');
const inIdade = document.getElementById('inIdade');
const inCPF = document.getElementById('inCPF');
const inTelefone = document.getElementById('inTelefone');
const selectCategoria = document.getElementById('selectCategoria');

const btnRegistrarAtleta = document.getElementById('btnRegistrarAtleta');

function cadastrarAtleta(nome, cpf, dataNascimento, email, telefone, categoria){
    
    if (!buscarAtleta(cpf)) {
        return false; //atleta nao existe
    }else{
        let novoAtleta = new Atleta(nome, cpf, dataNascimento, email, telefone, categoria);
        return true; //atleta cadastrado com sucesso
    }
//TEM QUE TERMINAR ESSA FUNCAO E CADASTRAR  O ATLETA NO VETOR DE ATLETAS QUE ESTA NO MODEL COMPETICAO.JS
}


function buscarAtleta(cpfProcurado){

    let atletaExiste = false;

    vetAtletas.forEach(function(atleta){
        if(atleta.cpf == cpfProcurado){
            atletaExiste = true;
        }

    });
}