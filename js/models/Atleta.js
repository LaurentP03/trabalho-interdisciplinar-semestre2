export class Atleta {
    #id;
    #nome;
    #cpf;
    #dataNascimento;
    #categoria;

    constructor(id, nome, cpf, dataNascimento, categoria) {
        this.#id = id;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#categoria = categoria;
    }

    getId() {
        return this.#id;
    }

    getNome() {
        return this.#nome;
    }

    getCpf() {
        return this.#cpf;
    }

    getDataNascimento() {
        return this.#dataNascimento;
    }

    getCategoria() {
        return this.#categoria;
    }

    setNome(nome) {
        this.#nome = nome;
    }

    setDataNascimento(dataNascimento) {
        this.#dataNascimento = dataNascimento;
    }

    setCategoria(categoria) {
        this.#categoria = categoria;
    }

    toString() {
        return `Atleta: ${this.#nome}, CPF: ${this.#cpf}, Categoria: ${this.#categoria}`;
    }
}