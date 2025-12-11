let totalCompeticoesEl = document.getElementById('totalCompeticoes');
let totalAtletasEl = document.getElementById('totalAtletas');
let totalInscricoesEl = document.getElementById('totalInscricoes');

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