export class Competicao {
    #id;
    #nome;
    #data;
    #local;
    #distancia;
    #atletas;

    constructor(id, nome, data, local, distancia) {
        this.#id = id;
        this.#nome = nome;
        this.#data = data;
        this.#local = local;
        this.#distancia = distancia;
        this.#atletas = [];
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

    get distancia() {
        return this.#distancia;
    }

    get atletas() {
        return this.#atletas;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    set data(data) {
        this.#data = data;
    }

    set local(local) {
        this.#local = local;
    }

    set distancia(distancia) {
        this.#distancia = distancia;
    }

    // Métodos para gerenciar atletas
    adicionarAtleta(idAtleta) {
        if (!this.#atletas.includes(idAtleta)) {
            this.#atletas.push(idAtleta);
        }
    }

    removerAtleta(idAtleta) {
        this.#atletas = this.#atletas.filter(id => id !== idAtleta);
    }

    toString() {
        return `Competição: ${this.#nome}, Data: ${this.#data}, Local: ${this.#local}, Distância: ${this.#distancia}km, Atletas inscritos: ${this.#atletas.length}`;
    }
}