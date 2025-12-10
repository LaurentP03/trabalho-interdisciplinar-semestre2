export class Competicao {

    #nome;
    #descricao;
    #categoria; // trailRunning ou maratona
    #data;
    #distanciaKM;
    #limiteAtletas;
    #listaCompetidores; // array de atletas inscritos
    #valorInscricao;
    static #quantidadeInscritos = 0;

    constructor(nome, descricao, categoria /* trailRunning ou maratona */, data, distanciaKM, limiteAtletas, listaCompetidores = [], valorInscricao) {

        this.#nome = nome;
        this.#descricao = descricao;
        this.#categoria = categoria;
        this.#data = data;
        this.#distanciaKM = distanciaKM;
        this.#limiteAtletas = limiteAtletas;
        this.#listaCompetidores = listaCompetidores;
        this.#valorInscricao = valorInscricao;


        //this.#quantidadeInscritos = listaCompetidores.length;
        //esta errado pq static nao pode ser acessado com this. 
        Competicao.#quantidadeInscritos = listaCompetidores.length +1;
    }


    get nome() {
        return this.#nome;
    }   

    get descricao() {
        return this.#descricao;
    }   

    get categoria() {
        return this.#categoria;
    }

    get data() {
        return this.#data;
    }

    get distanciaKM() { 

        return this.#distanciaKM;
    }

    get limiteAtletas() {
        return this.#limiteAtletas;
    }

    get listaCompetidores() {
        return this.#listaCompetidores;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    set data(novaData) {
        this.#data = novaData;
    }

    set limiteAtletas(novoLimite) {
        this.#limiteAtletas = novoLimite;
    }   

    set distanciaKM(novaDistancia) {
        this.#distanciaKM = novaDistancia;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    set listaCompetidores(novaLista) {
        this.#listaCompetidores = novaLista;
    }

    get valorInscricao() {
        return this.#valorInscricao;
    } //nao faz sentido mudar  o valor de inscricao depois que a competicao ja foi criada pq se alguem ja se inscreveu, o valor tem que ser o mesmo pra todo mundo

    get quantidadeInscritos() {
        return Competicao.#quantidadeInscritos;
    }
}
