import * as atletaController from './js/controllers/AtletaController.js';
import * as competicaoController from './js/controllers/CompeticaoController.js';
import * as inscricoesController from './js/controllers/InscricoesController.js';
import * as dashboardController from './js/controllers/DashboardController.js';

const currentPage = window.location.pathname;

if (currentPage.includes('atletas.html')) {
    atletaController.inicializar();
} else if (currentPage.includes('competicoes.html')) {
    competicaoController.inicializar();
} else if (currentPage.includes('inscricoes.html')) {
    inscricoesController.inicializar();
} else if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
    dashboardController.inicializar();
}