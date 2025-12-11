const tbody = document.getElementById('corpoTabelaAtletas');
const formulario = document.getElementById('formularioAtleta');
const form = document.getElementById('formAtleta');
const tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(atletas) {
    if (!tbody) {
        return;
    }

    if (atletas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum atleta encontrado.</td></tr>';
        return;
    }

    let html = '';
    let i = 0;
    
    while (i < atletas.length) {
        let a = atletas[i];
        let dataFormatada = formatarData(a.dataNascimento);
        
        html = html + '<tr>';
        html = html + '<td>' + a.id + '</td>';
        html = html + '<td>' + a.nome + '</td>';
        html = html + '<td>' + a.cpf + '</td>';
        html = html + '<td>' + dataFormatada + '</td>';
        html = html + '<td>';
        html = html + '<button class="btn-acao btn-editar" data-action="editar" data-id="' + a.id + '">✏️</button>';
        html = html + '<button class="btn-acao btn-excluir" data-action="excluir" data-id="' + a.id + '">🗑️</button>';
        html = html + '</td>';
        html = html + '</tr>';
        
        i = i + 1;
    }
    
    tbody.innerHTML = html;
}

export function abrirFormulario(modo) {
    if (!formulario) {
        return;
    }
    
    formulario.style.display = 'block';
    
    if (modo === 'editar') {
        tituloFormulario.textContent = 'Editar Atleta';
    } else {
        tituloFormulario.textContent = 'Cadastrar Novo Atleta';
    }
    
    if (modo === 'criar') {
        if (form) {
            form.reset();
        }
        
        let cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.disabled = false;
        }
    }
}

export function fecharFormulario() {
    if (formulario) {
        formulario.style.display = 'none';
    }
    
    if (form) {
        form.reset();
    }
}

export function preencherFormulario(atleta) {
    let idInput = document.getElementById('atletaId');
    if (idInput) {
        idInput.value = atleta.id;
    }
    
    let nomeInput = document.getElementById('nome');
    if (nomeInput) {
        nomeInput.value = atleta.nome;
    }
    
    let cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.value = atleta.cpf;
        cpfInput.disabled = true;
    }
    
    let dataInput = document.getElementById('dataNascimento');
    if (dataInput) {
        dataInput.value = atleta.dataNascimento;
    }
    
    let btnSalvar = document.getElementById('btnSalvar');
    if (btnSalvar) {
        btnSalvar.textContent = 'Atualizar';
    }
}

export function obterDadosFormulario() {
    let dados = {
        nome: '',
        cpf: '',
        dataNascimento: ''
    };
    
    let nomeInput = document.getElementById('nome');
    if (nomeInput) {
        dados.nome = nomeInput.value;
    }
    
    let cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        dados.cpf = cpfInput.value;
    }
    
    let dataInput = document.getElementById('dataNascimento');
    if (dataInput) {
        dados.dataNascimento = dataInput.value;
    }
    
    return dados;
}

export function mostrarMensagem(msg) {
    alert(msg);
}

function formatarData(data) {
    let partes = data.split('-');
    let ano = partes[0];
    let mes = partes[1];
    let dia = partes[2];
    
    return dia + '/' + mes + '/' + ano;
}

export function configurarMascaraCPF() {
    let cpfInput = document.getElementById('cpf');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let valor = e.target.value;
            valor = valor.replace(/\D/g, '');
            
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = valor;
            }
        });
    }
}