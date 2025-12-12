import { Competicao } from './Competicao.js';



export class Maratona extends Competicao {

    #pontosDeHidratacao;

    constructor(id, nome, data, local, distancia, pontosDeHidratacao) {
        super(id, nome, data, local, distancia);

    this.#pontosDeHidratacao = pontosDeHidratacao;

    }


    toString() {
        return super.toString() + ", Tipo: Maratona" + ", Pontos de Hidratação em (km): " + this.#pontosDeHidratacao;
    }
}
