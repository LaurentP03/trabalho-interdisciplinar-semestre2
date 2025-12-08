import { Competicao } from "./Competicao.js";

export class TrailRunning extends Competicao {

    #tipoTrilha;
    #desnivelAcumulado;

    constructor(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, organizador, tipoTrilha, desnivelAcumulado) {
        super(nome, data, local, distanciaKm, limiteAtletas, valorInscricao, "trailRunning", organizador);
        this.#tipoTrilha = tipoTrilha;
        this.#desnivelAcumulado = desnivelAcumulado;
    }

    get tipoTrilha() {
        return this.#tipoTrilha;
    }

    get desnivelAcumulado() {
        return this.#desnivelAcumulado;
    }

    set tipoTrilha(valor) {
        this.#tipoTrilha = valor;
    }

    set desnivelAcumulado(valor) {
        this.#desnivelAcumulado = valor;
    }

    toString() {
        return `${super.toString()} | Tipo: Trail Running ${this.getIconeTrilha()} | Trilha: ${this.#tipoTrilha} | Desnível: ${this.#desnivelAcumulado}m | Dificuldade: ${this.getDificuldade()}`;
    }
}