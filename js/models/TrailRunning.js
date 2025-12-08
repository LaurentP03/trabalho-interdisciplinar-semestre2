import { Competicao } from './Competicao.js';

export class TrailRunning extends Competicao {
    #tipoDeTrilha;
    #desnivel;

    constructor(id, nome, data, local, distancia, tipoDeTrilha, desnivel) {
        super(id, nome, data, local, distancia);
        this.#tipoDeTrilha = tipoDeTrilha;
        this.#desnivel = desnivel;
    }

    getTipoDeTrilha() {
        return this.#tipoDeTrilha;
    }

    getDesnivel() {
        return this.#desnivel;
    }

    setTipoDeTrilha(tipoDeTrilha) {
        this.#tipoDeTrilha = tipoDeTrilha;
    }

    setDesnivel(desnivel) {
        this.#desnivel = desnivel;
    }

    toString() {
        return `${super.toString()}, Tipo: Trail Running, Trilha: ${this.#tipoDeTrilha}, Desnível: ${this.#desnivel}m`;
    }
}