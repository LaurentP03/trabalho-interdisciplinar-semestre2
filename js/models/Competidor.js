export class Competidor {
    #id;
    #idAtleta;
    #idCompeticao;
    #dataInscricao;
    #status;

    constructor(id, idAtleta, idCompeticao, dataInscricao, status) {
        this.#id = id;
        this.#idAtleta = idAtleta;
        this.#idCompeticao = idCompeticao;
        this.#dataInscricao = dataInscricao;
        this.#status = status || 'ativo';
    }

    get id() {
        return this.#id;
    }

    get idAtleta() {
        return this.#idAtleta;
    }

    get idCompeticao() {
        return this.#idCompeticao;
    }

    get dataInscricao() {
        return this.#dataInscricao;
    }

    get status() {
        return this.#status;
    }

    set status(novoStatus) {
        this.#status = novoStatus;
    }

    toString() {
        return 'Competidor ID: ' + this.#id + ', Atleta: ' + this.#idAtleta + ', Competição: ' + this.#idCompeticao + ', Status: ' + this.#status;
    }
}