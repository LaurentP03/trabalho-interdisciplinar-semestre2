export class TrailRunning extends Competicao {

    #nivelTecnico; // facil, medio, dificil
    #altimeriaMetros; // total de subida em metros
    #tipoTerreno; // montanha, floresta, deserto, urbano

    constructor (nome, descricao, categoria /* trailRunning ou maratona */, data,
         distanciaKM, limiteAtletas, listaCompetidores = [], valorInscricao,
        nivelTecnico, altimeriaMetros, tipoTerreno) {

            super(nome, descricao, categoria, data,
                 distanciaKM, limiteAtletas, listaCompetidores, valorInscricao);

            this.#nivelTecnico = nivelTecnico;
            this.#altimeriaMetros = altimeriaMetros;
            this.#tipoTerreno = tipoTerreno;
            
    }


    get nivelTecnico() {
        return this.#nivelTecnico;
    }   

    get altimeriaMetros() { 
        return this.#altimeriaMetros;
    }  

    get tipoTerreno() {
        return this.#tipoTerreno;
    }

    set nivelTecnico(novoNivel) {
        this.#nivelTecnico = novoNivel;
    }

    set altimeriaMetros(novaAltimeria) {
        this.#altimeriaMetros = novaAltimeria;
    }

    set tipoTerreno(novoTipo) {
        this.#tipoTerreno = novoTipo;
    }

}