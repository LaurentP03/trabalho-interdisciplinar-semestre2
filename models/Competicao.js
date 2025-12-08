export class Competicao {
    constructor(nome, categoria, data, vagas, descricao, distancia, local, hora, descricaoGeral, valorInscricao = 0) {
        this.nome = nome;
        this.categoria = categoria;
        this.data = data;
        this.vagas = vagas;
        this.descricao = descricao;
        this.distancia = distancia;
        this.local = local;
        this.descricaoGeral = descricaoGeral;
    }
}