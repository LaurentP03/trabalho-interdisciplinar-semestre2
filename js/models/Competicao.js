export class Competicao {
    constructor(id, nome, data, local, distancia) {
        this._id = id;
        this._nome = nome;
        this._data = data;
        this._local = local;
        this._distancia = distancia;
        this._atletas = [];
    }

    get id() {
        return this._id;
    }

    get nome() {
        return this._nome;
    }

    get data() {
        return this._data;
    }

    get local() {
        return this._local;
    }

    get distancia() {
        return this._distancia;
    }

    get atletas() {
        return this._atletas;
    }

    set nome(nome) {
        this._nome = nome;
    }

    set data(data) {
        this._data = data;
    }

    set local(local) {
        this._local = local;
    }

    set distancia(distancia) {
        this._distancia = distancia;
    }

    adicionarAtleta(idAtleta) {
        let jaExiste = false;
        let i = 0;
        
        while (i < this._atletas.length) {
            if (this._atletas[i] === idAtleta) {
                jaExiste = true;
                break;
            }
            i = i + 1;
        }
        
        if (!jaExiste) {
            this._atletas.push(idAtleta);
        }
    }

    removerAtleta(idAtleta) {
        let novosAtletas = [];
        let i = 0;
        
        while (i < this._atletas.length) {
            if (this._atletas[i] !== idAtleta) {
                novosAtletas.push(this._atletas[i]);
            }
            i = i + 1;
        }
        
        this._atletas = novosAtletas;
    }

    toString() {
        return 'Competição: ' + this._nome + ', Data: ' + this._data + ', Local: ' + this._local + ', Distância: ' + this._distancia + 'km, Atletas inscritos: ' + this._atletas.length;
    }
}