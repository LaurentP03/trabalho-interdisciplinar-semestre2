import { Competicao } from './Competicao.js';

export class TrailRunning extends Competicao {

    #tipoTerreno;

    constructor(id, nome, data, local, distancia, tipoTerreno) {
        super(id, nome, data, local, distancia);
        this.#tipoTerreno = tipoTerreno;
    }

    toString() {
        return super.toString() + ", Tipo: Trail Running, Terreno: " + this.#tipoTerreno;
    }
}
