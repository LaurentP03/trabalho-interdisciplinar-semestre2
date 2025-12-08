import { Competicao } from './Competicao.js';

export class Maratona extends Competicao {
    #percursoUrbano;
    #altimetria;

    constructor(id, nome, data, local, distancia, percursoUrbano, altimetria) {
        super(id, nome, data, local, distancia);
        this.#percursoUrbano = percursoUrbano;
        this.#altimetria = altimetria;
    }

    getPercursoUrbano() {
        return this.#percursoUrbano;
    }

    getAltimetria() {
        return this.#altimetria;
    }

    setPercursoUrbano(percursoUrbano) {
        this.#percursoUrbano = percursoUrbano;
    }

    setAltimetria(altimetria) {
        this.#altimetria = altimetria;
    }

    toString() {
        return `${super.toString()}, Tipo: Maratona, Percurso: ${this.#percursoUrbano}, Altimetria: ${this.#altimetria}m`;
    }
}