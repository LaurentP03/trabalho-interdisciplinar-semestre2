import { competicaoController } from './CompeticaoController.js';
import { atletaController } from './AtletaController.js';

export class InscricoesController {
    inscrever(nomeCompeticao, cpfAtleta) {

        var comp = competicaoController.buscarPorNome(nomeCompeticao);
        var atleta = atletaController.buscarPorCpf(cpfAtleta);

        if (comp === null) {
            return { sucesso: false, mensagem: "Competição não encontrada." };
        }

        if (atleta === null) {
            return { sucesso: false, mensagem: "Atleta não encontrado." };
        }

        var ok = comp.adicionarAtletaCompeticao(atleta);

        if (ok === true) {
        console.log(comp.atletas);

            return { sucesso: true, mensagem: "Atleta inscrito com sucesso!" };
        } else {
            return { sucesso: false, mensagem: "Atleta já está inscrito nesta competição." };
        }
    }//usando a sintaxe de objeto para retornar múltiplas informações pra adaptar melhor ao view.js que fizemos
}

export var inscricoesController = new InscricoesController();
