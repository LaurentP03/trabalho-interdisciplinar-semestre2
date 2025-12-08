import { Pessoa } from "./Pessoa.js";

export class Atleta extends Pessoa {

    #categoria; // Juvenil, Adulto, Master, Senior
    #inscricoes; // Array de inscrições

    constructor(nome, cpf, dataNascimento, email, telefone, categoria) {
        super(nome, cpf, dataNascimento, email, telefone);
        this.#categoria = categoria;
        this.#inscricoes = [];
    }

    // Getters
    get categoria() {
        return this.#categoria;
    }

    get inscricoes() {
        return this.#inscricoes;
    }

    // Setters
    set categoria(valor) {
        this.#categoria = valor;
    }

    // Métodos
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

    // Sobrescrita do toString - usa o toString da superclasse
    toString() {
        return `${super.toString()} | Categoria: ${this.#categoria} | Inscrições: ${this.#inscricoes.length}`;
    }
}