let tbody = document.getElementById('corpoTabelaAtletas');
let formulario = document.getElementById('formularioAtleta');
let form = document.getElementById('formAtleta');
let tituloFormulario = document.getElementById('tituloFormulario');

export function renderizarTabela(atletas) {
    if (!tbody) return;

    if (atletas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum atleta encontrado.</td></tr>';
        return;
    }

    let html = '';
    atletas.forEach(function(a) {
        html = html + '<tr>';
        html = html + '<td>' + a.id + '</td>';
        html = html + '<td>' + a.nome + '</td>';
        html = html + '<td>' + a.cpf + '</td>';
        html = html + '<td>' + formatarData(a.dataNascimento) + '</td>';
        html = html + '<td>';
        html = html + '<button class="btn-acao btn-editar" data-action="editar" data-id="' + a.id + '">✏️</button>';
        html = html + '<button class="btn-acao btn-excluir" data-action="excluir" data-id="' + a.id + '">🗑️</button>';
        html = html + '</td>';
        html = html + '</tr>';
    });
    
    tbody.innerHTML = html;
}

export function abrirFormulario(modo) {
    if (!formulario) return;
    
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
        let cpfElement = document.getElementById('cpf');
        if (cpfElement) {
            cpfElement.disabled = false;
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
    let atletaIdElement = document.getElementById('atletaId');
    let nomeElement = document.getElementById('nome');
    let cpfElement = document.getElementById('cpf');
    let dataNascimentoElement = document.getElementById('dataNascimento');
    let btnSalvarElement = document.getElementById('btnSalvar');
    
    if (atletaIdElement) {
        atletaIdElement.value = atleta.id;
    }
    if (nomeElement) {
        nomeElement.value = atleta.nome;
    }
    if (cpfElement) {
        cpfElement.value = atleta.cpf;
        cpfElement.disabled = true;
    }
    if (dataNascimentoElement) {
        dataNascimentoElement.value = atleta.dataNascimento;
    }
    if (btnSalvarElement) {
        btnSalvarElement.textContent = 'Atualizar';
    }
}

export function obterDadosFormulario() {
    let nomeElement = document.getElementById('nome');
    let cpfElement = document.getElementById('cpf');
    let dataNascimentoElement = document.getElementById('dataNascimento');
    
    return {
        nome: nomeElement ? nomeElement.value : '',
        cpf: cpfElement ? cpfElement.value : '',
        dataNascimento: dataNascimentoElement ? dataNascimentoElement.value : ''
    };
}

export function validarDataNascimento(data) {
    if (!data) {
        return { valido: false, mensagem: 'Data de nascimento é obrigatória!' };
    }

    let partes = data.split('-');
    let ano = parseInt(partes[0]);
    let mes = parseInt(partes[1]);
    let dia = parseInt(partes[2]);

    let anoAtual = new Date().getFullYear();

    if (ano > anoAtual) {
        return { valido: false, mensagem: 'A data de nascimento não pode ser futura!' };
    }

    if (ano < 1900) {
        return { valido: false, mensagem: 'O ano deve ser 1900 ou posterior!' };
    }

    if (mes < 1 || mes > 12) {
        return { valido: false, mensagem: 'Mês inválido!' };
    }

    if (dia < 1 || dia > 31) {
        return { valido: false, mensagem: 'Dia inválido!' };
    }

    if (mes == 2) {
        let bissexto = (ano % 4 == 0 && ano % 100 != 0) || (ano % 400 == 0);
        if (bissexto && dia > 29) {
            return { valido: false, mensagem: 'Fevereiro só tem 29 dias em ano bissexto!' };
        }
        if (!bissexto && dia > 28) {
            return { valido: false, mensagem: 'Fevereiro só tem 28 dias!' };
        }
    }

    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
        return { valido: false, mensagem: 'Este mês só tem 30 dias!' };
    }

    let idade = anoAtual - ano;
    if (idade < 5) {
        return { valido: false, mensagem: 'O atleta deve ter pelo menos 5 anos!' };
    }

    return { valido: true };
}

export function mostrarMensagem(msg, tipo) {
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
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = valor;
            }
        });
    }
}