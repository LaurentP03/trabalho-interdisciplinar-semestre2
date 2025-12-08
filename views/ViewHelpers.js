export function capturarDados() {
    return {
        nome: document.querySelector("#nome").value,
        categoria: document.querySelector("#categoria").value,
        data: document.querySelector("#data").value,
        vagas: document.querySelector("#limite").value,
        descricao: document.querySelector("#descricao").value,
        distancia: document.querySelector("#distancia").value,
        local: document.querySelector("#local").value,
        descricaoGeral: document.querySelector("#descricaoGeral").value
    };
}

export function limparFormulario() {
    document.querySelector("#formCorrida").reset();
}