// models/Competicao.js
export class Competicao {
    constructor({ nome, categoria, data, distancia = '', vagas = 0, descricao = '', local = '', descricaoGeral = '' } = {}) {
        this.nome = nome;
        this.categoria = categoria;
        this.data = data;
        this.distancia = distancia;
        this.vagas = Number(vagas) || 0;
        this.descricao = descricao;
        this.local = local;
        this.descricaoGeral = descricaoGeral;
    }
}
