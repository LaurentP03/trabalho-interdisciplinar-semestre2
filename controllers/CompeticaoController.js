// controllers/CompeticaoController.js
import { Competicao } from "../models/Competicao.js";
import { StorageService } from "../services/StorageService.js";

export class CompeticaoController {
    static criar(dados) {
        const lista = StorageService.listarCorridas();

        if (lista.some(c => c.nome === dados.nome)) {
            throw new Error("Já existe corrida com esse nome");
        }

        const corrida = new Competicao(dados);
        lista.push(corrida);
        StorageService.atualizar(lista);

        return corrida;
    }

    static listar() {
        return StorageService.listarCorridas();
    }

    static excluirPorNome(nome) {
        const lista = StorageService.listarCorridas();
        const nova = lista.filter(c => c.nome !== nome);
        StorageService.atualizar(nova);
        return nova;
    }
}
