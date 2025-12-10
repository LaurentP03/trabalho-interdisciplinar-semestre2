import { Atleta } from "./Atleta.js";
import { Competicao } from "./Competicao.js";
export class Competidor {

    //valor tem que estar  em competicao ou competidor?

    
    static #numeroPeito;
    #data_inscricao;

    constructor(data_inscricao){

        this.#data_inscricao = data_inscricao;

        Competidor.#numeroPeito = Number(("" + Competicao.quantidadeInscritos + Atleta.data_nasc.getFullYear()).padEnd(6,'0')); //concatena a quantidade de inscritos com o ano de nascimento do atleta

    }


    get data_inscricao() {
        return this.#data_inscricao;
    }

    get numeroPeito() {
        return Competidor.#numeroPeito;
    }

}