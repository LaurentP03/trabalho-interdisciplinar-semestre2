export class Maratona extends Competicao {

    #distancia_pontos_agua; // em km
    #certificado; // boolean
    #altimetria_tipo; // plana, moderada, dificil

    constructor(nome, descricao, categoria /* trailRunning ou maratona */, data,
        distanciaKM, limiteAtletas, listaCompetidores = [], valorInscricao,
        distancia_pontos_agua, certificado /* boolean */, altimetria_tipo) {

        super(nome, descricao, categoria, data,
            distanciaKM, limiteAtletas, listaCompetidores, valorInscricao);


        this.#distancia_pontos_agua = distancia_pontos_agua;
        this.#certificado = certificado;
        this.#altimetria_tipo = altimetria_tipo;
    }

    get distancia_pontos_agua() {
        return this.#distancia_pontos_agua;
    }

    get certificado() {
        return this.#certificado;
    }

    get altimetria_tipo() {
        return this.#altimetria_tipo;
    }

    set distancia_pontos_agua(novaDistancia) {
        this.#distancia_pontos_agua = novaDistancia;
    }

    set certificado(novoCertificado) {
        this.#certificado = novoCertificado;
    }

    set altimetria_tipo(novoTipo) {
        this.#altimetria_tipo = novoTipo;
    }
}