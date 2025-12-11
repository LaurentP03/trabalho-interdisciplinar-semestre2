let container = document.querySelector('.relatorio-container');

if (!container) {
    container = document.createElement('div');
    container.className = 'relatorio-container';
    let main = document.querySelector('main.container');
    
    if (main) {
        main.appendChild(container);
    }
}

export function renderizarRelatorio(competicoes) {
    if (!container) {
        return;
    }

    if (competicoes.length === 0) {
        container.innerHTML = '<p>Nenhuma competição cadastrada no sistema.</p>';
        return;
    }

    let html = '';
    html = html + '<div class="tabela-container">';
    html = html + '<table id="tabelaRelatorio">';
    html = html + '<thead>';
    html = html + '<tr>';
    html = html + '<th>Nome da Competição</th>';
    html = html + '<th>Quantidade de Inscritos</th>';
    html = html + '</tr>';
    html = html + '</thead>';
    html = html + '<tbody>';

    let i = 0;
    while (i < competicoes.length) {
        let comp = competicoes[i];
        
        html = html + '<tr>';
        html = html + '<td>' + comp.nome + '</td>';
        html = html + '<td>' + comp.atletas.length + '</td>';
        html = html + '</tr>';
        
        i = i + 1;
    }

    html = html + '</tbody>';
    html = html + '</table>';
    html = html + '</div>';

    container.innerHTML = html;
}