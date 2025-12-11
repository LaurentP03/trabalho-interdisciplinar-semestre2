import * as competicaoController from './CompeticaoController.js';
import { renderizarRelatorio } from '../views/relatoriosView.js';

export function inicializar() {
    competicaoController.inicializar();
    
    setTimeout(function() {
        let competicoes = competicaoController.listar();
        renderizarRelatorio(competicoes);
    }, 100);
}