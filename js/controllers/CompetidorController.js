import { Competidor } from '../models/Competidor.js';

let competidores = [];
let proximoId = 1;
let carregado = false;

function salvar() {
    try {
        let competidoresParaSalvar = competidores.map(function(c) {
            return {
                id: c.id,
                idAtleta: c.idAtleta,
                idCompeticao: c.idCompeticao,
                dataInscricao: c.dataInscricao,
                status: c.status
            };
        });
        
        let dados = JSON.stringify(competidoresParaSalvar);
        localStorage.setItem('competidores', dados);
        localStorage.setItem('competidoresId', proximoId.toString());
    } catch (error) {
        console.error('Erro ao salvar competidores:', error);
    }
}

function carregar() {
    if (carregado) return;
    
    try {
        let dados = localStorage.getItem('competidores');
        if (dados) {
            let competidoresCarregados = JSON.parse(dados);
            
            competidores = competidoresCarregados.map(function(c) {
                return new Competidor(c.id, c.idAtleta, c.idCompeticao, c.dataInscricao, c.status);
            });
            
            let id = localStorage.getItem('competidoresId');
            proximoId = id ? parseInt(id) : 1;
            carregado = true;
            console.log('✓ Competidores carregados do localStorage:', competidores.length);
        }
    } catch (error) {
        console.error('Erro ao carregar competidores:', error);
    }
}

export function inicializar() {
    carregar();
}

function validarInscricao(idAtleta, idCompeticao) {
    let jaInscrito = competidores.find(function(c) {
        return c.idAtleta === idAtleta && c.idCompeticao === idCompeticao && c.status === 'ativo';
    });
    
    if (jaInscrito) {
        return { valido: false, mensagem: 'Atleta já está inscrito nesta competição!' };
    }
    
    return { valido: true };
}

export function inscreverAtleta(idAtleta, idCompeticao) {
    carregar();
    
    let validacao = validarInscricao(idAtleta, idCompeticao);
    if (!validacao.valido) {
        return { sucesso: false, mensagem: validacao.mensagem };
    }
    
    let dataHoje = new Date();
    let ano = dataHoje.getFullYear();
    let mes = String(dataHoje.getMonth() + 1).padStart(2, '0');
    let dia = String(dataHoje.getDate()).padStart(2, '0');
    let dataInscricao = ano + '-' + mes + '-' + dia;
    
    let novoCompetidor = new Competidor(proximoId++, idAtleta, idCompeticao, dataInscricao, 'ativo');
    competidores.push(novoCompetidor);
    salvar();
    
    return { sucesso: true, competidor: novoCompetidor };
}

export function buscarPorId(id) {
    carregar();
    return competidores.find(function(c) {
        return c.id === id;
    });
}

export function listarPorAtleta(idAtleta) {
    carregar();
    return competidores.filter(function(c) {
        return c.idAtleta === idAtleta && c.status === 'ativo';
    });
}

export function listarPorCompeticao(idCompeticao) {
    carregar();
    return competidores.filter(function(c) {
        return c.idCompeticao === idCompeticao && c.status === 'ativo';
    });
}

export function contarInscricoes() {
    carregar();
    return competidores.filter(function(c) {
        return c.status === 'ativo';
    }).length;
}

export function contarInscricoesPorCompeticao(idCompeticao) {
    carregar();
    return competidores.filter(function(c) {
        return c.idCompeticao === idCompeticao && c.status === 'ativo';
    }).length;
}

export function cancelarInscricao(id) {
    carregar();
    let competidor = buscarPorId(id);
    if (competidor) {
        competidor.status = 'cancelado';
        salvar();
        return { sucesso: true, mensagem: 'Inscrição cancelada!' };
    }
    return { sucesso: false, mensagem: 'Inscrição não encontrada!' };
}

export function listar() {
    carregar();
    return competidores;
}