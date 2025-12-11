// js/repositories/CompeticaoRepository.js
// Responsável pela lógica de negócio das competições

import { Maratona } from '../models/Maratona.js';
import { TrailRunning } from '../models/TrailRunning.js';
import { StorageService } from '../services/StorageService.js';

class CompeticaoRepositoryClass {
    constructor() {
        this.competicoes = [];
        this.proximoId = 1;
        this.carregado = false;
    }

    carregar() {
        if (this.carregado) return;
        
        const competicoesData = StorageService.carregarCompeticoes();
        
        this.competicoes = competicoesData.map(c => {
            let comp;
            if (c.tipo === 'maratona') {
                comp = new Maratona(c.id, c.nome, c.data, c.local, c.distancia);
            } else {
                comp = new TrailRunning(c.id, c.nome, c.data, c.local, c.distancia);
            }
            
            // Restaurar atletas
            c.atletas.forEach(idAtleta => comp.adicionarAtleta(idAtleta));
            
            return comp;
        });
        
        this.proximoId = StorageService.carregarProximoIdCompeticao();
        this.carregado = true;
        
        console.log('✓ Competições carregadas:', this.competicoes.length);
    }

    salvar() {
        const competicoesParaSalvar = this.competicoes.map(c => ({
            id: c.id,
            nome: c.nome,
            data: c.data,
            local: c.local,
            distancia: c.distancia,
            atletas: c.atletas,
            tipo: c instanceof Maratona ? 'maratona' : 'trail'
        }));
        
        StorageService.salvarCompeticoes(competicoesParaSalvar);
        StorageService.salvarProximoIdCompeticao(this.proximoId);
    }

    criar(nome, data, local, distancia, tipo) {
        this.carregar();
        
        let comp;
        if (tipo === 'maratona') {
            comp = new Maratona(this.proximoId, nome, data, local, distancia);
        } else {
            comp = new TrailRunning(this.proximoId, nome, data, local, distancia);
        }
        
        this.proximoId++;
        this.competicoes.push(comp);
        this.salvar();
        
        return { sucesso: true, competicao: comp };
    }

    atualizar(id, nome, data, local, distancia) {
        this.carregar();
        
        const comp = this.competicoes.find(c => c.id === id);
        if (!comp) {
            return { sucesso: false, mensagem: 'Competição não encontrada!' };
        }
        
        comp.nome = nome;
        comp.data = data;
        comp.local = local;
        comp.distancia = distancia;
        this.salvar();
        
        return { sucesso: true, competicao: comp };
    }

    excluir(id) {
        this.carregar();
        
        this.competicoes = this.competicoes.filter(c => c.id !== id);
        this.salvar();
        
        return { sucesso: true };
    }

    buscarPorId(id) {
        this.carregar();
        return this.competicoes.find(c => c.id === id);
    }

    listar() {
        this.carregar();
        return [...this.competicoes];
    }

    filtrar(termo, tipo) {
        this.carregar();
        let filtradas = this.competicoes;
        
        // Filtrar por tipo
        if (tipo === 'maratona') {
            filtradas = filtradas.filter(c => c instanceof Maratona);
        } else if (tipo === 'trail') {
            filtradas = filtradas.filter(c => c instanceof TrailRunning);
        }
        
        // Filtrar por termo de busca
        if (termo) {
            const termoLower = termo.toLowerCase().trim();
            filtradas = filtradas.filter(c =>
                c.nome.toLowerCase().includes(termoLower) ||
                c.local.toLowerCase().includes(termoLower)
            );
        }
        
        return filtradas;
    }

    adicionarAtleta(idCompeticao, idAtleta) {
        this.carregar();
        
        const comp = this.buscarPorId(idCompeticao);
        if (!comp) {
            return { sucesso: false, mensagem: 'Competição não encontrada!' };
        }
        
        comp.adicionarAtleta(idAtleta);
        this.salvar();
        
        return { sucesso: true };
    }

    removerAtleta(idCompeticao, idAtleta) {
        this.carregar();
        
        const comp = this.buscarPorId(idCompeticao);
        if (!comp) {
            return { sucesso: false, mensagem: 'Competição não encontrada!' };
        }
        
        comp.removerAtleta(idAtleta);
        this.salvar();
        
        return { sucesso: true };
    }

    contarTotal() {
        this.carregar();
        return this.competicoes.length;
    }

    carregarExemplos() {
        if (this.competicoes.length > 0) return;
        
        this.criar('Maratona SP', '2025-06-15', 'São Paulo', 42, 'maratona');
        this.criar('Trail Mantiqueira', '2025-07-20', 'Campos do Jordão', 21, 'trail');
        this.criar('Maratona RJ', '2025-08-10', 'Rio de Janeiro', 42, 'maratona');
        
        console.log('✓ Exemplos de competições carregados');
    }

    // Método auxiliar para formatar para view
    prepararParaView(competicoes) {
        return competicoes.map(c => ({
            id: c.id,
            nome: c.nome,
            data: c.data,
            local: c.local,
            distancia: c.distancia,
            atletas: c.atletas,
            tipoFormatado: c instanceof Maratona ? 'Maratona' : 'Trail Running'
        }));
    }
}

// Exportar instância única (Singleton)
export const CompeticaoRepository = new CompeticaoRepositoryClass();