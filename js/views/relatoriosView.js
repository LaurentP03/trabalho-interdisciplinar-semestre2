// Elemento do DOM
let container = document.querySelector('.relatorio-container');

if (!container) {
    container = document.createElement('div');
    container.className = 'relatorio-container';
    const main = document.querySelector('main.container');
    if (main) {
        main.appendChild(container);
    }
}

export function renderizarRelatorio(competicoes) {
    if (!container) return;

    if (competicoes.length === 0) {
        container.innerHTML = '<p>Nenhuma competição cadastrada no sistema.</p>';
        return;
    }

    let html = `
        <div class="tabela-container">
            <table id="tabelaRelatorio">
                <thead>
                    <tr>
                        <th>Nome da Competição</th>
                        <th>Quantidade de Inscritos</th>
                    </tr>
                </thead>
                <tbody>
    `;

    competicoes.forEach(comp => {
        html += `
            <tr>
                <td>${comp.nome}</td>
                <td>${comp.atletas.length}</td>
            </tr>
        `;
    });

    html += `
                </tbody>
            </table>
        </div>
    `;

    container.innerHTML = html;
}