import { CompeticaoController } from './controllers/CompeticaoController.js';

export const UI = {
    initCadastro() {
        document.getElementById("btnCadastrar")?.addEventListener("click", () => {
            // Captura dados do formulário
            const dados = {
                nome: document.getElementById("nome").value,
                descricao: document.getElementById("descricao").value,
                categoria: document.getElementById("categoria").value,
                data: document.getElementById("data").value,
                distancia: document.getElementById("distancia").value,
                limiteAtletas: document.getElementById("limite").value,
                local: document.getElementById("local").value,
                descricaoGeral: document.getElementById("descricaoGeral").value
            };

            // Validação básica
            if (!dados.nome || !dados.data) {
                alert("Por favor, preencha pelo menos o nome e a data da corrida.");
                return;
            }

            // Salva a corrida
            const corridaSalva = CompeticaoController.criar(dados);
            
            // Mostra mensagem e redireciona
            alert(`Corrida "${corridaSalva.nome}" cadastrada com sucesso! Redirecionando para a lista...`);
            
            // Redireciona para a lista de corridas
            setTimeout(() => {
                window.location.href = "listaOrganizador.html";
            }, 1500);
        });
    }
};