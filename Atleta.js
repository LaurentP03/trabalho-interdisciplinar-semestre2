export class Atleta {
    #id;
    #nome;
    #cpf;
    #dataNascimento;

    constructor(id, nome, cpf, dataNascimento) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get cpf() {
        return this.#cpf;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    set dataNascimento(dataNascimento) {
        this.#dataNascimento = dataNascimento;
    }

    toString() {
        return "Atleta: " + this.#nome + ", CPF: " + this.#cpf + ", Data Nascimento: " + this.#dataNascimento;
    }
}
