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

    getId() {
        return this.#id;
    }

    getNome() {
        return this.#nome;
    }

    getData() {
        return this.#data;
    }

    getLocal() {
        return this.#local;
    }

    getDistancia() {
        return this.#distancia;
    }

    getAtletas() {
        return this.#atletas;
    }

    setNome(nome) {
        this.#nome = nome;
    }

    setData(data) {
        this.#data = data;
    }

    setLocal(local) {
        this.#local = local;
    }

    setDistancia(distancia) {
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