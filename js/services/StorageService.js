// js/services/StorageService.js
// Responsável por gerenciar TODA a comunicação com localStorage

export const StorageService = {
    // ==== ATLETAS ====
    carregarAtletas() {
        try {
            const dados = localStorage.getItem('atletas');
            return dados ? JSON.parse(dados) : [];
        } catch (error) {
            console.error('Erro ao carregar atletas:', error);
            return [];
        }
    },

    salvarAtletas(atletas) {
        try {
            localStorage.setItem('atletas', JSON.stringify(atletas));
        } catch (error) {
            console.error('Erro ao salvar atletas:', error);
        }
    },

    carregarProximoIdAtleta() {
        const id = localStorage.getItem('atletasId');
        return id ? parseInt(id) : 1;
    },

    salvarProximoIdAtleta(id) {
        localStorage.setItem('atletasId', id.toString());
    },

    // ==== COMPETIÇÕES ====
    carregarCompeticoes() {
        try {
            const dados = localStorage.getItem('competicoes');
            return dados ? JSON.parse(dados) : [];
        } catch (error) {
            console.error('Erro ao carregar competições:', error);
            return [];
        }
    },

    salvarCompeticoes(competicoes) {
        try {
            localStorage.setItem('competicoes', JSON.stringify(competicoes));
        } catch (error) {
            console.error('Erro ao salvar competições:', error);
        }
    },

    carregarProximoIdCompeticao() {
        const id = localStorage.getItem('competicoesId');
        return id ? parseInt(id) : 1;
    },

    salvarProximoIdCompeticao(id) {
        localStorage.setItem('competicoesId', id.toString());
    },

    // ==== COMPETIDORES (INSCRIÇÕES) ====
    carregarCompetidores() {
        try {
            const dados = localStorage.getItem('competidores');
            return dados ? JSON.parse(dados) : [];
        } catch (error) {
            console.error('Erro ao carregar competidores:', error);
            return [];
        }
    },

    salvarCompetidores(competidores) {
        try {
            localStorage.setItem('competidores', JSON.stringify(competidores));
        } catch (error) {
            console.error('Erro ao salvar competidores:', error);
        }
    },

    carregarProximoIdCompetidor() {
        const id = localStorage.getItem('competidoresId');
        return id ? parseInt(id) : 1;
    },

    salvarProximoIdCompetidor(id) {
        localStorage.setItem('competidoresId', id.toString());
    },

    // ==== UTILITÁRIOS ====
    limparTudo() {
        localStorage.clear();
    }
};