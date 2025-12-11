// js/controllers/DashboardController.js (REFATORADO)
import { CompeticaoRepository } from '../repositories/CompeticaoRepository.js';
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { InscricaoRepository } from '../repositories/InscricaoRepository.js';
import { renderizarEstatisticas } from '../views/dashboardView.js';

export function inicializar() {
    // Garantir que todos os dados estão carregados
    CompeticaoRepository.carregar();
    CompeticaoRepository.carregarExemplos();
    
    AtletaRepository.carregar();
    AtletaRepository.carregarExemplos();
    
    InscricaoRepository.carregar();

    setTimeout(() => {
        const totalCompeticoes = CompeticaoRepository.contarTotal();
        const totalAtletas = AtletaRepository.contarTotal();
        const totalInscricoes = InscricaoRepository.contarTotal();

        renderizarEstatisticas({
            totalCompeticoes,
            totalAtletas,
            totalInscricoes
        });
    }, 100);
}