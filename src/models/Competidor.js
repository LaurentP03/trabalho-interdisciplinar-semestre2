export class Competidor {

    static #contadorNumero = 1;
    #numeroPeito;
    #data_inscricao;
    #atleta;
    #competicao;
    #statusPagamento;
    #posicao;

    constructor(data_inscricao, atleta, competicao) {

        this.#data_inscricao = data_inscricao;
        this.#atleta = atleta;
        this.#competicao = competicao;
        this.#statusPagamento = "Pendente";

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

    get posicao() {
        return this.#posicao;
    }

    set statusPagamento(novoStatus) {
        this.#statusPagamento = novoStatus;
    }

    set posicao(novaPosicao) {
        this.#posicao = novaPosicao;
    }

    toString() {
        return `Nº Peito: ${this.#numeroPeito} | Atleta: ${this.#atleta.nome} | Competição: ${this.#competicao.nome} | Posição: ${this.#posicao || 'N/A'}`;
    }
}