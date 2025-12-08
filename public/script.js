import { CompeticaoController } from "../controllers/CompeticaoController.js";
import { capturarDados, limparFormulario } from "../views/ViewHelpers.js";

document.querySelector("#btnCadastrar").addEventListener("click", (e) => {
    e.preventDefault();

    const dados = capturarDados();
    CompeticaoController.criar(dados);

    alert("Corrida cadastrada com sucesso!");
    limparFormulario();
});
