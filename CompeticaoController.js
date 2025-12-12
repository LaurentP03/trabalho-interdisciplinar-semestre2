import { Competicao } from './Competicao.js';
import { Maratona } from './Maratona.js';
import { TrailRunning } from './TrailRunning.js';

export class CompeticaoController {
    #competicoes;
    #proximoId;

    constructor() {
        this.#competicoes = [];
        this.#proximoId = 1;
    }

    cadastrar(tipo, nome, data, local, distancia, pontosAgua, tipoTerreno) {
    var novaCompeticao = null;

    if (tipo === "maratona") {
        novaCompeticao = new Maratona(this.#proximoId, nome, data, local, distancia, pontosAgua);
    }

    if (tipo === "trail") {
        novaCompeticao = new TrailRunning(this.#proximoId, nome, data, local, distancia, tipoTerreno);
    }

    if (novaCompeticao === null) {
        return false;
    }

    this.#competicoes.push(novaCompeticao);
    this.#proximoId = this.#proximoId + 1;
    return true;
}


    listar() {
        return this.#competicoes;
    }

    buscarPorNome(nome) {
        var encontrada = null;
        for (var i = 0; i < this.#competicoes.length; i++) {
            if (this.#competicoes[i].nome === nome) {
                encontrada = this.#competicoes[i];
            }
        }
        return encontrada;
    }

    buscarPorId(id) {
        var encontrada = null;
        for (var i = 0; i < this.#competicoes.length; i++) {
            if (this.#competicoes[i].id === id) {
                encontrada = this.#competicoes[i];
            }
        }
        return encontrada;
    }


    adicionarAtletaNaCompeticao(idCompeticao, idAtleta) {

    var comp = this.buscarPorId(idCompeticao);
    if (comp === null) {
        return false;
    }

    var atleta = atletaController.buscarPorId(idAtleta);
    if (atleta === null) {
        return false;
    }

    var atletaAdicionado = comp.adicionarAtletaCompeticao(atleta);
    console.log(comp.atletas);

    return atletaAdicionado; 
}
}

export var competicaoController = new CompeticaoController();
