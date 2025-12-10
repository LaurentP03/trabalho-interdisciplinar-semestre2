
CREATE DATABASE IF NOT EXISTS sistema_competicoes;
USE sistema_competicoes;

CREATE TABLE atleta (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_cpf_formato CHECK (cpf REGEXP '^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$')
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

CREATE TABLE competicao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    data_evento DATE NOT NULL,
    LOCAL VARCHAR(200) NOT NULL,
    distancia DECIMAL(6,2) NOT NULL,
    tipo ENUM('MARATONA', 'TRAIL_RUNNING') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_distancia CHECK (distancia > 0)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

CREATE TABLE maratona (
    id INT PRIMARY KEY,
    tempo_limite_horas INT NOT NULL DEFAULT 6,
    percurso_tipo ENUM('URBANO', 'MISTO') DEFAULT 'URBANO',
    FOREIGN KEY (id) REFERENCES competicao(id) ON DELETE CASCADE,
    CONSTRAINT chk_tempo_limite CHECK (tempo_limite_horas > 0)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

CREATE TABLE trail_running (
    id INT PRIMARY KEY,
    elevacao_metros INT NOT NULL DEFAULT 0,
    dificuldade ENUM('FACIL', 'MODERADO', 'DIFICIL', 'EXTREMO') DEFAULT 'MODERADO',
    terreno VARCHAR(100),
    FOREIGN KEY (id) REFERENCES competicao(id) ON DELETE CASCADE,
    CONSTRAINT chk_elevacao CHECK (elevacao_metros >= 0)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

CREATE TABLE inscricao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    atleta_id INT NOT NULL,
    competicao_id INT NOT NULL,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    numero_peito INT,
    STATUS ENUM('CONFIRMADA', 'CANCELADA', 'PENDENTE') DEFAULT 'CONFIRMADA',
    FOREIGN KEY (atleta_id) REFERENCES atleta(id) ON DELETE CASCADE,
    FOREIGN KEY (competicao_id) REFERENCES competicao(id) ON DELETE CASCADE,
    UNIQUE KEY uk_atleta_competicao (atleta_id, competicao_id)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;

INSERT INTO atleta (nome, cpf, data_nascimento) VALUES
('João Silva Santos', '123.456.789-00', '1990-05-15'),
('Maria Oliveira Souza', '987.654.321-11', '1988-09-22'),
('Carlos Alberto Lima', '456.789.123-22', '1995-01-10'),
('Ana Paula Fernandes', '321.654.987-33', '1992-07-08'),
('Rafael Gomes Pereira', '159.753.486-44', '1989-03-19'),
('Fernanda Costa Ribeiro', '753.159.624-55', '1996-12-02'),
('Lucas Martins Duarte', '852.456.951-66', '1993-11-11'),
('Juliana Mendes Rocha', '951.258.357-77', '1991-02-27'),
('Bruno Carvalho Matos', '258.369.147-88', '1994-06-30'),
('Patrícia Nogueira Alves', '369.147.258-99', '1990-10-05'),
('Eduardo Farias Pinto', '741.852.963-12', '1987-08-14'),
('Letícia Morais Barbosa', '963.741.852-23', '1997-04-09'),
('Ricardo Azevedo Torres', '654.987.321-34', '1986-01-25'),
('Camila Batista Duarte', '147.258.369-45', '1993-09-17'),
('Felipe Souza Andrade', '852.963.741-56', '1995-05-21'),
('Larissa Vieira Campos', '789.456.123-67', '1998-12-29'),
('Marcos Paulo Rezende', '258.147.369-78', '1989-04-03'),
('Beatriz Rezende Cunha', '357.258.147-89', '1991-03-12'),
('Thiago Moreira Lopes', '159.486.753-90', '1988-02-20'),
('Helena Duarte Carvalho', '486.159.753-01', '1996-07-27'),
('Diego Araújo Farias', '741.963.258-13', '1994-11-16'),
('Nathalia Queiroz Braga', '963.258.741-24', '1992-10-09'),
('André Luiz Monteiro', '654.321.987-35', '1987-06-18'),
('Daniela Prado Cardoso', '147.369.258-46', '1993-12-25'),
('Renato Silveira Moura', '258.963.147-57', '1990-01-05'),
('Mirella Tavares Pinto', '357.147.258-68', '1998-09-03'),
('Gabriel Antunes Barros', '159.753.468-79', '1995-08-11'),
('Sabrina Costa Menezes', '468.159.753-80', '1989-07-14'),
('Vitor Henrique Ramos', '741.258.963-91', '1992-04-26'),
('Aline Barbosa Furtado', '963.852.741-02', '1997-03-07'),

INSERT INTO competicao (nome, data_evento, LOCAL, distancia, tipo) VALUES
('Maratona Internacional de São Paulo', '2024-06-15', 'São Paulo - SP', 42.195, 'MARATONA'),
('Maratona do Rio de Janeiro', '2024-08-20', 'Rio de Janeiro - RJ', 42.195, 'MARATONA'),
('Maratona de Porto Alegre', '2024-09-10', 'Porto Alegre - RS', 42.195, 'MARATONA'),
('Meia Maratona de Curitiba', '2024-07-05', 'Curitiba - PR', 21.097, 'MARATONA'),
('Maratona de Brasília', '2024-10-12', 'Brasília - DF', 42.195, 'MARATONA'),
('Maratona de Salvador', '2024-11-25', 'Salvador - BA', 42.195, 'MARATONA'),
('Meia Maratona de Florianópolis', '2024-05-30', 'Florianópolis - SC', 21.097, 'MARATONA'),
('Maratona de Belo Horizonte', '2024-12-08', 'Belo Horizonte - MG', 42.195, 'MARATONA'),
('Maratona de Fortaleza', '2024-08-15', 'Fortaleza - CE', 42.195, 'MARATONA'),
('Meia Maratona de Recife', '2024-09-22', 'Recife - PE', 21.097, 'MARATONA'),
('Maratona de Manaus', '2024-07-18', 'Manaus - AM', 42.195, 'MARATONA'),
('Maratona de Vitória', '2024-06-28', 'Vitória - ES', 42.195, 'MARATONA'),
('Meia Maratona de Goiânia', '2024-10-05', 'Goiânia - GO', 21.097, 'MARATONA'),
('Maratona de Belém', '2024-11-10', 'Belém - PA', 42.195, 'MARATONA'),
('Maratona de São Luís', '2024-05-25', 'São Luís - MA', 42.195, 'MARATONA'),
('Meia Maratona de Natal', '2024-08-08', 'Natal - RN', 21.097, 'MARATONA'),
('Maratona de Campinas', '2024-09-14', 'Campinas - SP', 42.195, 'MARATONA'),
('Maratona de Santos', '2024-07-20', 'Santos - SP', 42.195, 'MARATONA'),
('Meia Maratona de Sorocaba', '2024-06-12', 'Sorocaba - SP', 21.097, 'MARATONA'),
('Maratona de Ribeirão Preto', '2024-10-26', 'Ribeirão Preto - SP', 42.195, 'MARATONA'),
('Trail Running Mantiqueira', '2024-07-22', 'Campos do Jordão - SP', 25.0, 'TRAIL_RUNNING'),
('Trail da Serra Gaúcha', '2024-08-12', 'Gramado - RS', 30.0, 'TRAIL_RUNNING'),
('Trail Running Chapada Diamantina', '2024-09-05', 'Lençóis - BA', 42.0, 'TRAIL_RUNNING'),
('Trail do Itacolomi', '2024-06-18', 'Ouro Preto - MG', 21.0, 'TRAIL_RUNNING'),
('Trail Running Serra do Mar', '2024-07-30', 'Paranapiacaba - SP', 28.0, 'TRAIL_RUNNING'),
('Trail da Pedra Azul', '2024-10-15', 'Domingos Martins - ES', 35.0, 'TRAIL_RUNNING'),
('Trail Running Vale do Pati', '2024-11-20', 'Chapada Diamantina - BA', 50.0, 'TRAIL_RUNNING'),
('Trail da Floresta da Tijuca', '2024-05-28', 'Rio de Janeiro - RJ', 18.0, 'TRAIL_RUNNING'),
('Trail Running Aparados da Serra', '2024-08-25', 'Cambará do Sul - RS', 32.0, 'TRAIL_RUNNING'),
('Trail do Pico da Bandeira', '2024-09-18', 'Alto Caparaó - MG', 40.0, 'TRAIL_RUNNING'),
('Trail Running Serra da Canastra', '2024-06-25', 'São Roque de Minas - MG', 27.0, 'TRAIL_RUNNING');