import { Atleta } from "./Atleta.js";
import { Competicao } from "./Competicao.js";

export class Competidor {

    static #contadorNumero = 1;
    #numeroPeito;
    #data_inscricao;
    #atleta;
    #competicao;
  
    #tempoProva;
    #posicao;

    constructor(data_inscricao, atleta, competicao) {

        this.#data_inscricao = data_inscricao;
        this.#atleta = atleta;
        this.#competicao = competicao;
    
        this.#tempoProva = null;
        this.#posicao = null;

        // Gera número de peito único
        const anoNasc = new Date(atleta.dataNasc).getFullYear();
        this.#numeroPeito = Number(("" + Competidor.#contadorNumero + anoNasc).padEnd(6, '0'));
        Competidor.#contadorNumero++;
    }

    get data_inscricao() {
        return this.#data_inscricao;
    }

    get numeroPeito() {
        return this.#numeroPeito;
    }

    get atleta() {
        return this.#atleta;
    }

    get competicao() {
        return this.#competicao;
    }

    get tempoProva() {
        return this.#tempoProva;
    }

    get posicao() {
        return this.#posicao;
    }

    set tempoProva(novoTempo) {
        this.#tempoProva = novoTempo;
    }

    set posicao(novaPosicao) {
        this.#posicao = novaPosicao;
    }

 
    // Método toString
    toString() {
        return `Nº Peito: ${this.#numeroPeito} | Atleta: ${this.#atleta.nome} | Competição: ${this.#competicao.nome} | Tempo: ${this.#tempoProva || 'N/A'} | Posição: ${this.#posicao || 'N/A'}`;
    }
}