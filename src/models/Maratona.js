import { Competicao } from "./Competicao.js";

export class Maratona extends Competicao {

    #percursoUrbano;
    #altimetria;

    constructor(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, organizador, percursoUrbano, altimetria) {
        super(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, "maratona", organizador);
        this.#percursoUrbano = percursoUrbano;
        this.#altimetria = altimetria;
    }

    get percursoUrbano() {
        return this.#percursoUrbano;
    }

    get altimetria() {
        return this.#altimetria;
    }

    set percursoUrbano(valor) {
        this.#percursoUrbano = valor;
    }

    set altimetria(valor) {
        this.#altimetria = valor;
    }

    toString() {
        return `${super.toString()} | Tipo: Maratona | Percurso: ${this.#percursoUrbano} | Altimetria: ${this.#altimetria}m (${this.getDificuldadeAltimetria()})`;
    }
}