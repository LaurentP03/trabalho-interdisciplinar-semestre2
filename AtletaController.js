import { Atleta } from './Atleta.js';

export class AtletaController {
    #atletas;
    #proximoId;

    constructor() {
        this.#atletas = [];
        this.#proximoId = 1;
    }

    cadastrar(nome, cpf, dataNascimento) {
        var novo = new Atleta(this.#proximoId, nome, cpf, dataNascimento);
        this.#atletas.push(novo);
        this.#proximoId = this.#proximoId + 1;
        return true;
    }

    listar() {
        return this.#atletas;
    }

    buscarPorCpf(cpf) {
        var encontrado = null;
        for (var i = 0; i < this.#atletas.length; i++) {
            if (this.#atletas[i].cpf === cpf) {
                encontrado = this.#atletas[i];
            }
        }
        return encontrado;
    }

    buscarPorId(id) {
        var encontrado = null;
        for (var i = 0; i < this.#atletas.length; i++) {
            if (this.#atletas[i].id === id) {
                encontrado = this.#atletas[i];
            }
        }
        return encontrado;
    }
}

export var atletaController = new AtletaController();
