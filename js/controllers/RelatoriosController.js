import * as competicaoController from './CompeticaoController.js';
import { renderizarRelatorio } from '../views/relatoriosView.js';

export function inicializar() {
    competicaoController.inicializar();
    
    setTimeout(() => {
        renderizarRelatorio(competicaoController.listar());
    }, 100);
}