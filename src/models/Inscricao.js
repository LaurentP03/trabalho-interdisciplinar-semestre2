export class Inscricao {

    static #totalInscricoes = 0;
    static #ultimoNumero = 0;
    #id;
    #atleta;
    #competicao;
    #numeroPeito;
    #dataInscricao;
    #tempoProva;
    #posicao;

    constructor(atleta, competicao, dataInscricao = new Date()) {
        Inscricao.#totalInscricoes++;
        Inscricao.#ultimoNumero++;
        
        this.#id = Inscricao.#totalInscricoes;
        this.#atleta = atleta;
        this.#competicao = competicao;
        this.#numeroPeito = this.#gerarNumeroPeito();
        this.#dataInscricao = dataInscricao;
        this.#tempoProva = null;
        this.#posicao = null;
    }

    get id() {
        return this.#id;
    }

    get atleta() {
        return this.#atleta;
    }

    get competicao() {
        return this.#competicao;
    }

    get numeroPeito() {
        return this.#numeroPeito;
    }

    get dataInscricao() {
        return this.#dataInscricao;
    }

    get tempoProva() {
        return this.#tempoProva;
    }

    get posicao() {
        return this.#posicao;
    }

    static get totalInscricoes() {
        return Inscricao.#totalInscricoes;
    }

    set tempoProva(valor) {
        this.#tempoProva = valor;
    }

    set posicao(valor) {
        this.#posicao = valor;
    }

    #gerarNumeroPeito() {
        return String(Inscricao.#ultimoNumero).padStart(3, '0');
    }

    getDataFormatada() {
        return new Date(this.#dataInscricao).toLocaleDateString('pt-BR');
    }

    toString() {
        return `Nº ${this.#numeroPeito} | ${this.#atleta.nome} → ${this.#competicao.nome} | Data: ${this.getDataFormatada()}`;
    }
}