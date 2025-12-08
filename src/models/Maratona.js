import { Competicao } from "./Competicao.js";

export class Maratona extends Competicao {

    #percursoUrbano; // Descrição do percurso (Ex: Av. Paulista, Centro)
    #altimetria; // Altimetria em metros

    constructor(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, organizador, percursoUrbano, altimetria) {
        super(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, "maratona", organizador);
        this.#percursoUrbano = percursoUrbano;
        this.#altimetria = altimetria;
    }

    // Getters
    get percursoUrbano() {
        return this.#percursoUrbano;
    }

    get altimetria() {
        return this.#altimetria;
    }

    // Setters
    set percursoUrbano(valor) {
        this.#percursoUrbano = valor;
    }

    set altimetria(valor) {
        this.#altimetria = valor;
    }

    // Métodos específicos
    getDificuldadeAltimetria() {
        if (this.#altimetria < 50) return "Plano";
        if (this.#altimetria < 150) return "Leve";
        if (this.#altimetria < 300) return "Moderado";
        return "Desafiador";
    }

    // Sobrescrita do toString - usa o toString da superclasse
    toString() {
        return `${super.toString()} | Tipo: Maratona | Percurso: ${this.#percursoUrbano} | Altimetria: ${this.#altimetria}m (${this.getDificuldadeAltimetria()})`;
    }
}