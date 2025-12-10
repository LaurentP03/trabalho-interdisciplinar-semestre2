const totalCompeticoesEl = document.getElementById('totalCompeticoes');
const totalAtletasEl = document.getElementById('totalAtletas');
const totalInscricoesEl = document.getElementById('totalInscricoes');

export function renderizarEstatisticas(dados) {
    if (totalCompeticoesEl) {
        totalCompeticoesEl.textContent = dados.totalCompeticoes;
    }
    
    if (totalAtletasEl) {
        totalAtletasEl.textContent = dados.totalAtletas;
    }
    
    if (totalInscricoesEl) {
        totalInscricoesEl.textContent = dados.totalInscricoes;
    }
}