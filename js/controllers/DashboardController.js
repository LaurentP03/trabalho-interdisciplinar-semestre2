import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import { renderizarEstatisticas } from '../views/dashboardView.js';

export function inicializar() {
    competicaoController.inicializar();
    atletaController.inicializar();
    
    setTimeout(function() {
        let totalCompeticoes = competicaoController.contarTotal();
        let totalAtletas = atletaController.contarTotal();
        
        let totalInscricoes = 0;
        let competicoes = competicaoController.listar();
        let i = 0;
        
        while (i < competicoes.length) {
            let comp = competicoes[i];
            totalInscricoes = totalInscricoes + comp.atletas.length;
            i = i + 1;
        }

        let dados = {
            totalCompeticoes: totalCompeticoes,
            totalAtletas: totalAtletas,
            totalInscricoes: totalInscricoes
        };
        
        renderizarEstatisticas(dados);
    }, 100);
}