import { Pessoa } from "./Pessoa.js";

export class Organizador extends Pessoa {

    #empresa;
    #cnpj;
    #competicoesOrganizadas; // Array de competições

    constructor(nome, cpf, dataNascimento, email, telefone, empresa, cnpj) {
        super(nome, cpf, dataNascimento, email, telefone);
        this.#empresa = empresa;
        this.#cnpj = cnpj;
        this.#competicoesOrganizadas = [];
    }

    // Getters
    get empresa() {
        return this.#empresa;
    }

    get cnpj() {
        return this.#cnpj;
    }

    get competicoesOrganizadas() {
        return this.#competicoesOrganizadas;
    }

    // Setters
    set empresa(valor) {
        this.#empresa = valor;
    }

    // Métodos
    adicionarCompeticao(competicao) {
        this.#competicoesOrganizadas.push(competicao);
    }

    removerCompeticao(competicaoId) {
        this.#competicoesOrganizadas = this.#competicoesOrganizadas.filter(
            comp => comp.id !== competicaoId
        );
    }

    totalCompeticoes() {
        return this.#competicoesOrganizadas.length;
    }

    // Sobrescrita do toString - usa o toString da superclasse
    toString() {
        return `${super.toString()} | Empresa: ${this.#empresa} | CNPJ: ${this.#cnpj} | Competições: ${this.#competicoesOrganizadas.length}`;
    }
}