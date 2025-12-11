// js/repositories/InscricaoRepository.js
// Responsável pela lógica de negócio das inscrições (competidores)

import { Competidor } from '../models/Competidor.js';
import { StorageService } from '../services/StorageService.js';

class InscricaoRepositoryClass {
    constructor() {
        this.competidores = [];
        this.proximoId = 1;
        this.carregado = false;
    }

    carregar() {
        if (this.carregado) return;
        
        const competidoresData = StorageService.carregarCompetidores();
        
        this.competidores = competidoresData.map(c =>
            new Competidor(c.id, c.idAtleta, c.idCompeticao, c.dataInscricao, c.status)
        );
        
        this.proximoId = StorageService.carregarProximoIdCompetidor();
        this.carregado = true;
        
        console.log('✓ Inscrições carregadas:', this.competidores.length);
    }

    salvar() {
        const competidoresParaSalvar = this.competidores.map(c => ({
            id: c.id,
            idAtleta: c.idAtleta,
            idCompeticao: c.idCompeticao,
            dataInscricao: c.dataInscricao,
            status: c.status
        }));
        
        StorageService.salvarCompetidores(competidoresParaSalvar);
        StorageService.salvarProximoIdCompetidor(this.proximoId);
    }

    validarInscricao(idAtleta, idCompeticao) {
        this.carregar();
        
        const jaInscrito = this.competidores.find(c =>
            c.idAtleta === idAtleta &&
            c.idCompeticao === idCompeticao &&
            c.status === 'ativo'
        );
        
        if (jaInscrito) {
            return { valido: false, mensagem: 'Atleta já está inscrito nesta competição!' };
        }
        
        return { valido: true };
    }

    criar(idAtleta, idCompeticao) {
        this.carregar();
        
        // Validar
        const validacao = this.validarInscricao(idAtleta, idCompeticao);
        if (!validacao.valido) {
            return { sucesso: false, mensagem: validacao.mensagem };
        }
        
        // Data de hoje
        const dataHoje = new Date();
        const ano = dataHoje.getFullYear();
        const mes = String(dataHoje.getMonth() + 1).padStart(2, '0');
        const dia = String(dataHoje.getDate()).padStart(2, '0');
        const dataInscricao = `${ano}-${mes}-${dia}`;
        
        const novoCompetidor = new Competidor(
            this.proximoId++,
            idAtleta,
            idCompeticao,
            dataInscricao,
            'ativo'
        );
        
        this.competidores.push(novoCompetidor);
        this.salvar();
        
        return { sucesso: true, competidor: novoCompetidor };
    }

    cancelar(id) {
        this.carregar();
        
        const competidor = this.buscarPorId(id);
        if (!competidor) {
            return { sucesso: false, mensagem: 'Inscrição não encontrada!' };
        }
        
        competidor.status = 'cancelado';
        this.salvar();
        
        return { sucesso: true, mensagem: 'Inscrição cancelada!' };
    }

    buscarPorId(id) {
        this.carregar();
        return this.competidores.find(c => c.id === id);
    }

    listarPorAtleta(idAtleta) {
        this.carregar();
        return this.competidores.filter(c =>
            c.idAtleta === idAtleta && c.status === 'ativo'
        );
    }

    listarPorCompeticao(idCompeticao) {
        this.carregar();
        return this.competidores.filter(c =>
            c.idCompeticao === idCompeticao && c.status === 'ativo'
        );
    }

    listar() {
        this.carregar();
        return [...this.competidores];
    }

    contarTotal() {
        this.carregar();
        return this.competidores.filter(c => c.status === 'ativo').length;
    }

    contarPorCompeticao(idCompeticao) {
        this.carregar();
        return this.competidores.filter(c =>
            c.idCompeticao === idCompeticao && c.status === 'ativo'
        ).length;
    }

    contarPorAtleta(idAtleta) {
        this.carregar();
        return this.competidores.filter(c =>
            c.idAtleta === idAtleta && c.status === 'ativo'
        ).length;
    }
}

// Exportar instância única (Singleton)
export const InscricaoRepository = new InscricaoRepositoryClass();