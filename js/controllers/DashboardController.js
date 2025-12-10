import * as competicaoController from './CompeticaoController.js';
import * as atletaController from './AtletaController.js';
import { renderizarEstatisticas } from '../views/dashboardView.js';

export function inicializar() {
    competicaoController.inicializar();
    atletaController.inicializar();
    
    setTimeout(() => {
        const totalCompeticoes = competicaoController.contarTotal();
        const totalAtletas = atletaController.contarTotal();
        
        let totalInscricoes = 0;
        competicaoController.listar().forEach(comp => {
            totalInscricoes += comp.atletas.length;
        });

        renderizarEstatisticas({
            totalCompeticoes,
            totalAtletas,
            totalInscricoes
        });
    }, 100);
}