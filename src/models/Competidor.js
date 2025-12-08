import { Atleta } from "./Atleta.js";
import { Competicao } from "./Competicao.js";

export class Competidor {

    static #contadorNumero = 1;
    #numeroPeito;
    #data_inscricao;
    #atleta;
    #competicao;
    #statusPagamento; // Pendente, Pago, Cancelado
    #tempoProva;
    #posicao;

    constructor(data_inscricao, atleta, competicao) {

        this.#data_inscricao = data_inscricao;
        this.#atleta = atleta;
        this.#competicao = competicao;
        this.#statusPagamento = "Pendente";
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

    get statusPagamento() {
        return this.#statusPagamento;
    }

    get tempoProva() {
        return this.#tempoProva;
    }

    get posicao() {
        return this.#posicao;
    }

    set statusPagamento(novoStatus) {
        this.#statusPagamento = novoStatus;
    }

    set tempoProva(novoTempo) {
        this.#tempoProva = novoTempo;
    }

    set posicao(novaPosicao) {
        this.#posicao = novaPosicao;
    }

    // Método para confirmar pagamento
    confirmarPagamento() {
        this.#statusPagamento = "Pago";
    }

    // Método para cancelar inscrição
    cancelarInscricao() {
        this.#statusPagamento = "Cancelado";
    }

    // Método para registrar resultado
    registrarResultado(tempo, posicao) {
        this.#tempoProva = tempo;
        this.#posicao = posicao;
    }

    // Método toString
    toString() {
        return `Nº Peito: ${this.#numeroPeito} | Atleta: ${this.#atleta.nome} | Competição: ${this.#competicao.nome} | Status: ${this.#statusPagamento} | Tempo: ${this.#tempoProva || 'N/A'} | Posição: ${this.#posicao || 'N/A'}`;
    }
}