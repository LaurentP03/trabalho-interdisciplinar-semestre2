import { Pessoa } from "./Pessoa.js";

export class Atleta extends Pessoa {

    #categoria;
    #inscricoes;

    constructor(nome, cpf, dataNascimento, email, telefone, categoria) {
        super(nome, cpf, dataNascimento, email, telefone);
        this.#categoria = categoria;
        this.#inscricoes = [];
    }

    get categoria() {
        return this.#categoria;
    }

    get inscricoes() {
        return this.#inscricoes;
    }

    set categoria(valor) {
        this.#categoria = valor;
    }

    adicionarInscricao(inscricao) {
        this.#inscricoes.push(inscricao);
    }

    removerInscricao(inscricaoId) {
        this.#inscricoes = this.#inscricoes.filter(insc => insc.id !== inscricaoId);
    }

    getInscricoesAtivas() {
        return this.#inscricoes.filter(insc => insc.statusPagamento === "Pago");
    }

    totalInscricoes() {
        return this.#inscricoes.length;
    }

    toString() {
        return `${super.toString()} | Categoria: ${this.#categoria} | Inscrições: ${this.#inscricoes.length}`;
    }
}