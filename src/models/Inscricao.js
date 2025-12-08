export class Inscricao {

    static #totalInscricoes = 0;
    static #ultimoNumero = 0;
    #id;
    #atleta; // Associação com Atleta
    #competicao; // Associação com Competicao
    #numeroPeito;
    #dataInscricao;
    #statusPagamento; // "Pendente", "Pago", "Cancelado"
    #tempoProva; // Tempo de conclusão (quando disponível)
    #posicao; // Posição no ranking (quando disponível)

    constructor(atleta, competicao, dataInscricao = new Date()) {
        Inscricao.#totalInscricoes++;
        Inscricao.#ultimoNumero++;
        
        this.#id = Inscricao.#totalInscricoes;
        this.#atleta = atleta;
        this.#competicao = competicao;
        this.#numeroPeito = this.#gerarNumeroPeito();
        this.#dataInscricao = dataInscricao;
        this.#statusPagamento = "Pendente";
        this.#tempoProva = null;
        this.#posicao = null;
    }

    // Getters
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

    get statusPagamento() {
        return this.#statusPagamento;
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

    // Setters
    set statusPagamento(valor) {
        this.#statusPagamento = valor;
    }

    set tempoProva(valor) {
        this.#tempoProva = valor;
    }

    set posicao(valor) {
        this.#posicao = valor;
    }

    // Métodos privados
    #gerarNumeroPeito() {
        // Gera número com 3 dígitos (001, 002, 003...)
        return String(Inscricao.#ultimoNumero).padStart(3, '0');
    }

    // Métodos públicos
    confirmarPagamento() {
        this.#statusPagamento = "Pago";
    }

    cancelarInscricao() {
        this.#statusPagamento = "Cancelado";
    }

    registrarResultado(tempo, posicao) {
        this.#tempoProva = tempo;
        this.#posicao = posicao;
    }

    getDataFormatada() {
        return new Date(this.#dataInscricao).toLocaleDateString('pt-BR');
    }

    getStatusIcone() {
        const icones = {
            "Pendente": "⏳",
            "Pago": "✅",
            "Cancelado": "❌"
        };
        return icones[this.#statusPagamento] || "❓";
    }

    toString() {
        return `Nº ${this.#numeroPeito} | ${this.#atleta.nome} → ${this.#competicao.nome} | Status: ${this.getStatusIcone()} ${this.#statusPagamento} | Data: ${this.getDataFormatada()}`;
    }
}