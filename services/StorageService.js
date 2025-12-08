// services/StorageService.js
export class StorageService {
    static KEY = "corridas";

    static listarCorridas() {
        return JSON.parse(localStorage.getItem(this.KEY) || "[]");
    }

    static salvar(corrida) {
        const lista = this.listarCorridas();
        lista.push(corrida);
        this.atualizar(lista);
    }

    static atualizar(lista) {
        localStorage.setItem(this.KEY, JSON.stringify(lista));
    }

    static limpar() {
        localStorage.removeItem(this.KEY);
    }
}
