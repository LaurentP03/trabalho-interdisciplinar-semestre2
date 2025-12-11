import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import * as competidorController from './CompetidorController.js';
import { renderizarEstatisticas } from '../views/dashboardView.js';

export function inicializar() {
    competicaoController.inicializar();
    atletaController.inicializar();
    competidorController.inicializar();
    
    setTimeout(function() {
        let totalCompeticoes = competicaoController.contarTotal();
        let totalAtletas = atletaController.contarTotal();
        let totalInscricoes = competidorController.contarInscricoes();

        renderizarEstatisticas({
            totalCompeticoes: totalCompeticoes,
            totalAtletas: totalAtletas,
            totalInscricoes: totalInscricoes
        });
    }, 100);
}