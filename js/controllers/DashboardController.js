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
        let listaCompeticoes = competicaoController.listar();
        
        listaCompeticoes.forEach(function(comp) {
            totalInscricoes = totalInscricoes + comp.atletas.length;
        });

        renderizarEstatisticas({
            totalCompeticoes: totalCompeticoes,
            totalAtletas: totalAtletas,
            totalInscricoes: totalInscricoes
        });
    }, 100);
}