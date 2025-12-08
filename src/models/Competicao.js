export class Competicao {

    static #totalCompeticoes = 0;
    #id;
    #nome;
    #data;
    #local;
    #distanciaKm;
    #limiteAtletas;
    #valorInscricao;
    #tipo;
    #inscricoes;
    #organizador;

    constructor(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, tipo, organizador) {
        Competicao.#totalCompeticoes++;
        this.#id = Competicao.#totalCompeticoes;
        this.#nome = nome;
        this.#data = data;
        this.#local = local;
        this.#distanciaKm = distanciaKm;
        this.#limiteAtletas = limiteAtletas;
        this.#valorInscricao = valorInscricao;
        this.#tipo = tipo;
        this.#inscricoes = [];
        this.#organizador = organizador;
    }

    get id() {
        return this.#id;
    }

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
        return this.#inscricoes;
    }

    get organizador() {
        return this.#organizador;
    }

    static get totalCompeticoes() {
        return Competicao.#totalCompeticoes;
    }

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

    adicionarInscricao(inscricao) {
        if (this.#inscricoes.length < this.#limiteAtletas) {
            this.#inscricoes.push(inscricao);
            return true;
        }
        return false;
    }

    removerInscricao(inscricaoId) {
        this.#inscricoes = this.#inscricoes.filter(insc => insc.id !== inscricaoId);
    }

    vagasDisponiveis() {
        return this.#limiteAtletas - this.#inscricoes.length;
    }

    totalInscritos() {
        return this.#inscricoes.length;
    }

    getDataFormatada() {
        const data = new Date(this.#data);
        return data.toLocaleDateString('pt-BR');
    }

    toString() {
        return `${this.getIcone()} ${this.#nome} | Data: ${this.getDataFormatada()} | Local: ${this.#local} | ${this.#distanciaKm}km | Inscritos: ${this.totalInscritos()}/${this.#limiteAtletas}`;
    }
}