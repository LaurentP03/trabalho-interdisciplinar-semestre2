export class Organizador extends Pessoa {

    #cargo;
    #registroProfissional;

    constructor( nome, CPF, data_nasc, cargo, registroProfissional) {
       super( nome, CPF, data_nasc);

        this.cargo = cargo;
        this.#registroProfissional = registroProfissional; 
   }

    get cargo() {    
        return this.#cargo;
    }

    get registroProfissional() {
        return this.#registroProfissional;
    }   

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }   

}