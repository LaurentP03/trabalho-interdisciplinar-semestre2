// js/repositories/AtletaRepository.js
// Responsável pela lógica de negócio dos atletas

import { Atleta } from '../models/Atleta.js';
import { StorageService } from '../services/StorageService.js';

class AtletaRepositoryClass {
    constructor() {
        this.atletas = [];
        this.proximoId = 1;
        this.carregado = false;
    }

    carregar() {
        if (this.carregado) return;
        
        const atletasData = StorageService.carregarAtletas();
        this.atletas = atletasData.map(a => 
            new Atleta(a.id, a.nome, a.cpf, a.dataNascimento)
        );
        
        this.proximoId = StorageService.carregarProximoIdAtleta();
        this.carregado = true;
        
        console.log('✓ Atletas carregados:', this.atletas.length);
    }

    salvar() {
        const atletasParaSalvar = this.atletas.map(a => ({
            id: a.id,
            nome: a.nome,
            cpf: a.cpf,
            dataNascimento: a.dataNascimento
        }));
        
        StorageService.salvarAtletas(atletasParaSalvar);
        StorageService.salvarProximoIdAtleta(this.proximoId);
    }

    criar(nome, cpf, dataNascimento) {
        this.carregar();
        
        // Validar CPF único
        const atletaExistente = this.atletas.find(a => a.cpf === cpf);
        if (atletaExistente) {
            return { sucesso: false, mensagem: 'CPF já cadastrado!' };
        }
        
        const novoAtleta = new Atleta(this.proximoId, nome, cpf, dataNascimento);
        this.proximoId++;
        this.atletas.push(novoAtleta);
        this.salvar();
        
        return { sucesso: true, atleta: novoAtleta };
    }

    atualizar(id, nome, dataNascimento) {
        this.carregar();
        
        const atleta = this.atletas.find(a => a.id === id);
        if (!atleta) {
            return { sucesso: false, mensagem: 'Atleta não encontrado!' };
        }
        
        atleta.nome = nome;
        atleta.dataNascimento = dataNascimento;
        this.salvar();
        
        return { sucesso: true, atleta };
    }

    excluir(id) {
        this.carregar();
        
        this.atletas = this.atletas.filter(a => a.id !== id);
        this.salvar();
        
        return { sucesso: true };
    }

    buscarPorId(id) {
        this.carregar();
        return this.atletas.find(a => a.id === id);
    }

    buscarPorCpf(cpf) {
        this.carregar();
        return this.atletas.find(a => a.cpf === cpf);
    }

    listar() {
        this.carregar();
        return [...this.atletas]; // Retorna cópia
    }

    filtrar(termo) {
        this.carregar();
        const termoLower = termo.toLowerCase().trim();
        
        if (!termoLower) return this.listar();
        
        return this.atletas.filter(a => 
            a.nome.toLowerCase().includes(termoLower) ||
            a.cpf.includes(termoLower)
        );
    }

    contarTotal() {
        this.carregar();
        return this.atletas.length;
    }

    carregarExemplos() {
        if (this.atletas.length > 0) return;
        
        this.criar('João Silva', '123.456.789-00', '1990-05-15');
        this.criar('Maria Santos', '987.654.321-00', '1985-08-20');
        this.criar('Pedro Costa', '456.789.123-00', '2000-03-10');
        
        console.log('✓ Exemplos de atletas carregados');
    }
}

// Exportar instância única (Singleton)
export const AtletaRepository = new AtletaRepositoryClass();