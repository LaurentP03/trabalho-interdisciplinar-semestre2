
export class Atleta extends Pessoa {

    #genero;
    #nivelExperiencia;
    #modalidade; 

    constructor( nome, CPF, data_nasc, genero, nivelExperiencia, modalidade) {
       super( nome, CPF, data_nasc);

        this.#genero = genero;
        this.#nivelExperiencia = nivelExperiencia;
        this.#modalidade = modalidade; //é regra de negocio, o atleta so pode ser cadastrado em UMA modalidade
   }

    get genero() {
        return this.#genero;
    }

    get nivelExperiencia() {
        return this.#nivelExperiencia;
    }
    
    get modalidade() {
        return this.#modalidade;
    }

    set modalidade(novaModalidade) {
        this.#modalidade = novaModalidade;
    }

    set nivelExperiencia(novoNivel) {
        this.#nivelExperiencia = novoNivel;
    }

    set genero(novoGenero) {
        this.#genero = novoGenero;
    }

}