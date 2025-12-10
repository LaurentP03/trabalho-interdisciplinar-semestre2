export class Competicao {

    static #totalCompeticoes = 0;
    #id;
    #nome;
    #data;
    #local;
    #distanciaKm;
    #limiteAtletas;
    #valorInscricao;
    #tipo; // "maratona" ou "trailRunning"
    #vetInscricoes; // Array de inscrições
    #organizador; // Associação com Organizador
    #descricao;

    constructor(nome, data, local, distanciaKm, limiteAtletas, /* valorInscricao */ tipo, /* organizador, */ descricao) {
       // Competicao.#totalCompeticoes++;
       // this.#id = Competicao.#totalCompeticoes;
        this.#nome = nome;
        this.#data = data;
        this.#local = local;
        this.#distanciaKm = distanciaKm;
        this.#limiteAtletas = limiteAtletas;
       // tirar this.#valorInscricao = valorInscricao;
        this.#tipo = tipo; // "maratona" ou "trailRunning"
        this.#vetInscricoes = [];
        this.#organizador = organizador;
        //descricao 
        this.#descricao = descricao;

    }

    // Getters
    /* get id() {
        return this.#id;
    }
 */
    get nome() {
        return this.#nome;
    }

    get data() {
        return this.#data;
    }

    get local() {
        return this.#local;
    }

    get distanciaKm() {
        return this.#distanciaKm;
    }

    get limiteAtletas() {
        return this.#limiteAtletas;
    }

    get valorInscricao() {
        return this.#valorInscricao;
    }

    get tipo() {
        return this.#tipo;
    }

    get inscricoes() {
        return this.#vetInscricoes;
    }

    get organizador() {
        return this.#organizador;
    }

    static get totalCompeticoes() {
        return Competicao.#totalCompeticoes;
    }

    // Setters
    set nome(valor) {
        this.#nome = valor;
    }

    set data(valor) {
        this.#data = valor;
    }

    set local(valor) {
        this.#local = valor;
    }

    set distanciaKm(valor) {
        this.#distanciaKm = valor;
    }

    set limiteAtletas(valor) {
        this.#limiteAtletas = valor;
    }

    set valorInscricao(valor) {
        this.#valorInscricao = valor;
    }

    // Métodos
    cadastrarCompeticao() {



    }

    adicionarCompetidor(competidor) {
        if (this.#vetInscricoes.length < this.#limiteAtletas) {
            this.#vetInscricoes.push(competidor);
            return true;
        }
        return false;
    }

    removerInscricao(inscricaoId) {
        this.#vetInscricoes = this.#vetInscricoes.filter(insc => insc.id !== inscricaoId);
    }

    vagasDisponiveis() {
        return this.#limiteAtletas - this.#vetInscricoes.length;
    }

    totalInscritos() {
        return this.#vetInscricoes.length;
    }
    
    getDataFormatada() {
        const data = new Date(this.#data);
        return data.toLocaleDateString('pt-BR');
    }

    toString() {
        return `${this.#nome} | Data: ${this.getDataFormatada()} | Local: ${this.#local} | ${this.#distanciaKm}km | Inscritos: ${this.totalInscritos()}/${this.#limiteAtletas}`;
    }
}