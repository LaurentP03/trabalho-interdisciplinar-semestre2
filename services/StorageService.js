export class StorageService {
    static KEY = "corridas";

    static salvar(corrida) {
        const lista = JSON.parse(localStorage.getItem(this.KEY) || "[]");
        lista.push(corrida);
        localStorage.setItem(this.KEY, JSON.stringify(lista));
    }

    static listarCorridas() {
        return JSON.parse(localStorage.getItem(this.KEY) || "[]");
    }
}