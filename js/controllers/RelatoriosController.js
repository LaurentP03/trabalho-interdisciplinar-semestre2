import * as competicaoController from './CompeticaoController.js';
import * as competidorController from './CompetidorController.js';
import { renderizarRelatorio } from '../views/relatoriosView.js';

export function inicializar() {
    competicaoController.inicializar();
    competidorController.inicializar();
    
    setTimeout(function() {
        let competicoes = competicaoController.listar();
        
        let competicoesComContagem = competicoes.map(function(comp) {
            let totalInscritos = competidorController.contarInscricoesPorCompeticao(comp.id);
            return {
                id: comp.id,
                nome: comp.nome,
                totalInscritos: totalInscritos
            };
        });
        
        renderizarRelatorio(competicoesComContagem);
    }, 100);
}
