export class Pessoa {

    static #pessoasCadastradas = 0;
    #id;
    #nome;
    #cpf;
    #dataNascimento;
    #email;
    #telefone;

    constructor(nome, cpf, dataNascimento, email, telefone) {
        Pessoa.#pessoasCadastradas++;
        this.#id = Pessoa.#pessoasCadastradas;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#dataNascimento = dataNascimento;
        this.#email = email;
        this.#telefone = telefone;
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

    get email() {
        return this.#email;
    }

    get telefone() {
        return this.#telefone;
    }

    static get totalPessoas() {
        return Pessoa.#pessoasCadastradas;
    }

    set nome(valor) {
        this.#nome = valor;
    }

    set email(valor) {
        this.#email = valor;
    }

    set telefone(valor) {
        this.#telefone = valor;
    }

    set dataNascimento(valor) {
        this.#dataNascimento = valor;
    }

    calcularIdade() {
        const hoje = new Date();
        const nascimento = new Date(this.#dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    toString() {
        return `ID: ${this.#id} | Nome: ${this.#nome} | CPF: ${this.#cpf} | Email: ${this.#email} | Telefone: ${this.#telefone}`;
    }
}