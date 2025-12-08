import { Competicao } from "./Competicao.js";

export class TrailRunning extends Competicao {

    #tipoTrilha; // Montanha, Floresta, Técnica, Mista
    #desnivelAcumulado; // Desnível acumulado em metros

    constructor(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, organizador, tipoTrilha, desnivelAcumulado) {
        super(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, "trailRunning", organizador);
        this.#tipoTrilha = tipoTrilha;
        this.#desnivelAcumulado = desnivelAcumulado;
    }

    // Getters
    get tipoTrilha() {
        return this.#tipoTrilha;
    }

    get desnivelAcumulado() {
        return this.#desnivelAcumulado;
    }

    // Setters
    set tipoTrilha(valor) {
        this.#tipoTrilha = valor;
    }

    set desnivelAcumulado(valor) {
        this.#desnivelAcumulado = valor;
    }

    // Métodos específicos
    getDificuldade() {
        const relacao = this.#desnivelAcumulado / this.distanciaKm;
        
        if (relacao < 30) return "Fácil";
        if (relacao < 60) return "Moderado";
        if (relacao < 100) return "Difícil";
        return "Extremo";
    }

    getIconeTrilha() {
        const icones = {
            "Montanha": "⛰️",
            "Floresta": "🌲",
            "Técnica": "🧗",
            "Mista": "🏔️"
        };
        return icones[this.#tipoTrilha] || "🥾";
    }

    // Sobrescrita do toString - usa o toString da superclasse
    toString() {
        return `${super.toString()} | Tipo: Trail Running ${this.getIconeTrilha()} | Trilha: ${this.#tipoTrilha} | Desnível: ${this.#desnivelAcumulado}m | Dificuldade: ${this.getDificuldade()}`;
    }
}