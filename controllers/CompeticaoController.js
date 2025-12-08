import { Competicao } from "../models/Competicao.js";
import { StorageService } from "../services/StorageService.js";

export class CompeticaoController {
    static criar(dados) {
        const corrida = new Competicao(
            dados.nome,
            dados.categoria,
            dados.data,
            dados.limiteAtletas || dados.vagas,
            dados.descricao,
            dados.distancia,
            dados.local,
            dados.descricaoGeral,
            dados.valorInscricao || 0  // Adiciona o valor da inscrição
        );
        StorageService.salvar(corrida);
        return corrida;
    }
}