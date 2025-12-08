// js/listar.js
import { StorageService } from "../services/StorageService.js";

function formatarData(dataStr) {
    if (!dataStr) return "Data não definida";
    const data = new Date(dataStr + 'T00:00:00');
    return data.toLocaleDateString('pt-BR');
}

function carregarCorridas() {
    const corridas = StorageService.listarCorridas();
    const container = document.getElementById("listaCorridas");
    const contador = document.getElementById("contador");

    contador.textContent = `Total de corridas: ${corridas.length}`;

    if (corridas.length === 0) {
        container.innerHTML = `
            <div class="corrida-vazia">
                <p>Nenhuma corrida cadastrada ainda.</p>
                <p>Clique em "Cadastrar Nova Corrida" para começar.</p>
            </div>
        `;
        return;
    }

    let html = '';
    corridas.forEach((corrida, index) => {
        html += `
            <div class="corrida-card">
                <div class="corrida-header">
                    <h3>${corrida.nome || 'Sem nome'}</h3>
                    <span class="corrida-categoria">${corrida.categoria || 'Sem categoria'}</span>
                </div>
                <div class="corrida-info">
                    <p><strong>Data:</strong> ${formatarData(corrida.data)}</p>
                    <p><strong>Local:</strong> ${corrida.local || 'Não informado'}</p>
                    <p><strong>Distância:</strong> ${corrida.distancia || '0'} km</p>
                    <p><strong>Vagas:</strong> ${corrida.vagas || '0'}</p>
                    <p><strong>Descrição:</strong> ${corrida.descricao || 'Sem descrição'}</p>
                    ${corrida.descricaoGeral ? `<p><strong>Detalhes:</strong> ${corrida.descricaoGeral}</p>` : ''}
                </div>
                <div class="corrida-acoes">
                    <button class="btn-excluir" data-nome="${corrida.nome}">Excluir</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // attach delete handlers
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nome = e.currentTarget.dataset.nome;
            const lista = StorageService.listarCorridas().filter(c => c.nome !== nome);
            StorageService.atualizar(lista);
            carregarCorridas(); // refresh
        });
    });
}

document.addEventListener('DOMContentLoaded', carregarCorridas);
export { carregarCorridas };

// filtering support
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('filtroCategoria');
  if (select) {
    select.addEventListener('change', () => {
      const cat = select.value;
      const all = StorageService.listarCorridas();
      const filtered = cat ? all.filter(c => c.categoria === cat) : all;
      render(filtered);
    });
  }
});

function render(corridas){
    const container = document.getElementById("listaCorridas");
    const contador = document.getElementById("contador");
    contador.textContent = `Total de corridas: ${corridas.length}`;
    let html = '';
    corridas.forEach((corrida,index)=>{
        html += `
        <div class="corrida-card">
            <div class="corrida-header">
                <h3>${corrida.nome}</h3>
                <span class="corrida-categoria">${corrida.categoria}</span>
            </div>
            <div class="corrida-info">
                <p><strong>Data:</strong> ${corrida.data}</p>
                <p><strong>Local:</strong> ${corrida.local}</p>
                <p><strong>Distância:</strong> ${corrida.distancia} km</p>
                <p><strong>Vagas:</strong> ${corrida.vagas}</p>
            </div>
            <button class="btn-excluir" data-nome="${corrida.nome}">Excluir</button>
        </div>`;
    });
    container.innerHTML = html;
    document.querySelectorAll('.btn-excluir').forEach(btn=>{
        btn.addEventListener('click',()=>{
            const nome = btn.dataset.nome;
            const nova = StorageService.listarCorridas().filter(c=>c.nome!==nome);
            StorageService.atualizar(nova);
            render(nova);
        });
    });
}
