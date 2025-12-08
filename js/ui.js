// js/ui.js
import { CompeticaoController } from "../controllers/CompeticaoController.js";

export const UI = {
    initCadastro() {
        document.getElementById("btnCadastrar")?.addEventListener("click", (e) => {
            e.preventDefault();
            const dados = {
                nome: document.querySelector("#nome").value.trim(),
                categoria: document.querySelector("#categoria").value,
                data: document.querySelector("#data").value,
                distancia: document.querySelector("#distancia").value,
                vagas: document.querySelector("#limite").value,
                descricao: document.querySelector("#descricao").value,
                local: document.querySelector("#local").value,
                descricaoGeral: document.querySelector("#descricaoGeral").value
            };

            if (!dados.nome || !dados.data) {
                alert("Preencha nome e data.");
                return;
            }

            try {
                CompeticaoController.criar(dados);
                alert("Corrida cadastrada!");
                window.location.href = "listaOrganizador.html";
            } catch (err) {
                alert(err.message || "Erro ao cadastrar");
            }
        });
    }
};
