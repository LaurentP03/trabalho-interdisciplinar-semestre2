export class Pessoa {

    static #pessoasCadastradas = 0;
    #id_pessoa;
    #nome;
    #CPF;
    #data_nasc;
    #telefone;

    constructor( nome, CPF, data_nasc, telefone) {

        this.#id_pessoa; 
        this.#nome = nome;
        this.#CPF = CPF; //tem q comparar se tem apenas 11 numeros
        this.#data_nasc = data_nasc;
        this.#telefone = telefone;

        Pessoa.#pessoasCadastradas++; //se passou pelo constructor, quer dizer que uma nova pessoa foi criada, logo soma UM à quantidade

        this.#id_pessoa = Number(("" + new Date().getFullYear() + Pessoa.#pessoasCadastradas).padEnd(7,'0')); // é necessario usar this. porque so nao é OBRIGATORIO usar 
        //da linha 8 pra cima

    }

    get id_pessoa() {
        return this.#id_pessoa;
    }


    get nome() {
        return this.#nome;
    }

    get CPF() {
        return this.#CPF;
    }

    get dataNasc() {
        return this.#data_nasc;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set dataNasc(novaData) {
        this.#data_nasc = novaData;
    }

}

/* var pessoa = new Pessoa("cecilia", "123", "20/10/2005" );

console.log(pessoa); */