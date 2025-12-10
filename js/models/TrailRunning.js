import { Competicao } from './Competicao.js';

export class TrailRunning extends Competicao {
    constructor(id, nome, data, local, distancia) {
        super(id, nome, data, local, distancia);
    }

    toString() {
        return `${super.toString()}, Tipo: Trail Running`;
    }
}