CREATE DATABASE IF NOT EXISTS sistema_competicoes;
USE sistema_competicoes;

CREATE TABLE Atletas (
    id_atleta INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(14) NOT NULL,
    data_nascimento DATE NOT NULL,

    CONSTRAINT Atletas_PK PRIMARY KEY (id_atleta),
    CONSTRAINT Atletas_UQ_CPF UNIQUE (cpf)
) ENGINE=INNODB;

CREATE TABLE Competicoes (
    id_competicao INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    data_evento DATE NOT NULL,
    local_evento VARCHAR(200) NOT NULL,
    tipo VARCHAR(20) NOT NULL,

    CONSTRAINT Competicoes_PK PRIMARY KEY (id_competicao)
) ENGINE=INNODB;

CREATE TABLE Maratonas (
    id_competicao INT UNSIGNED NOT NULL,

    CONSTRAINT Maratonas_PK PRIMARY KEY (id_competicao),
    CONSTRAINT Maratonas_FK FOREIGN KEY (id_competicao)
        REFERENCES Competicoes (id_competicao)
) ENGINE=INNODB;

CREATE TABLE Trail_Running (
    id_competicao INT UNSIGNED NOT NULL,

    CONSTRAINT Trail_PK PRIMARY KEY (id_competicao),
    CONSTRAINT Trail_FK FOREIGN KEY (id_competicao)
        REFERENCES Competicoes (id_competicao)
) ENGINE=INNODB;

CREATE TABLE Inscricoes (
    id_atleta INT UNSIGNED NOT NULL,
    id_competicao INT UNSIGNED NOT NULL,

    CONSTRAINT Inscricoes_PK PRIMARY KEY (id_atleta, id_competicao),

    CONSTRAINT Inscricoes_FK1 FOREIGN KEY (id_atleta)
        REFERENCES Atletas (id_atleta),

    CONSTRAINT Inscricoes_FK2 FOREIGN KEY (id_competicao)
        REFERENCES Competicoes (id_competicao)
) ENGINE=INNODB;


INSERT INTO Atletas (nome, cpf, data_nascimento) VALUES
('João Silva Santos', '123.456.789-00', '1990-05-15'),
('Maria Oliveira Rocha', '987.654.321-11', '1985-03-22'),
('Ricardo Azevedo Torres', '456.789.123-22', '1992-01-10'),
('Ana Paula Fernandes', '321.654.987-33', '1994-07-18'),
('Beatriz Cunha Lopes', '159.753.486-44', '1999-10-05'),
('Lucas Martins Duarte', '753.159.624-55', '1991-09-12'),
('Juliana Mendes Rocha', '852.456.951-66', '1997-08-11'),
('Bruno Carvalho Matos', '951.258.357-77', '1994-02-27'),
('Patrícia Alves Nogueira', '258.369.147-88', '1993-06-30'),
('Eduardo Farias Pinto', '369.147.258-99', '1987-08-14'),
('Letícia Morais Barbosa', '741.852.963-12', '1997-04-09'),
('Camila Batista Duarte', '963.741.852-23', '1993-09-17'),
('Felipe Souza Andrade', '654.987.321-34', '1995-05-21'),
('Larissa Vieira Campos', '147.258.369-45', '1998-12-29'),
('Marcos Paulo Rezende', '852.963.741-56', '1989-04-03'),
('Helena Duarte Carvalho', '789.456.123-67', '1996-07-27'),
('Diego Araújo Farias', '258.147.369-78', '1994-11-16'),
('Nathalia Braga Queiroz', '357.258.147-89', '1991-03-12'),
('André Luiz Monteiro', '159.486.753-90', '1988-02-20'),
('Daniela Prado Cardoso', '486.159.753-01', '1993-12-25'),
('Renato Moura Silveira', '741.963.258-13', '1990-01-05'),
('Mirella Tavares Pinto', '963.258.741-24', '1998-09-03'),
('Gabriel Antunes Barros', '654.321.987-35', '1995-08-11'),
('Sabrina Costa Menezes', '147.369.258-46', '1989-07-14'),
('Vitor Henrique Ramos', '258.963.147-57', '1992-04-26'),
('Aline Barbosa Furtado', '357.147.258-68', '1997-03-07'),
('Thiago Moreira Lopes', '159.753.468-79', '1988-02-20'),
('Rafael Gomes Pereira', '468.159.753-80', '1989-07-14'),
('Carla Moreira Tavares', '741.258.963-91', '1992-01-20'),
('Marina Silva Duarte', '963.852.741-02', '1996-11-29');

INSERT INTO Competicoes (nome, data_evento, local_evento, tipo) VALUES
('Maratona Internacional de São Paulo',      '2026-01-15', 'São Paulo - SP', 'MARATONA'),
('Maratona do Rio de Janeiro',               '2026-02-20', 'Rio de Janeiro - RJ', 'MARATONA'),
('Maratona de Porto Alegre',                 '2026-03-12', 'Porto Alegre - RS', 'MARATONA'),
('Maratona de Brasília',                     '2026-04-10', 'Brasília - DF', 'MARATONA'),
('Maratona de Salvador',                     '2026-05-08', 'Salvador - BA', 'MARATONA'),
('Maratona de Curitiba',                     '2026-06-02', 'Curitiba - PR', 'MARATONA'),
('Maratona de Fortaleza',                    '2026-07-11', 'Fortaleza - CE', 'MARATONA'),
('Maratona de Manaus',                       '2026-08-21', 'Manaus - AM', 'MARATONA'),
('Maratona de Belém',                        '2026-09-09', 'Belém - PA', 'MARATONA'),
('Maratona de Goiânia',                      '2026-10-20', 'Goiânia - GO', 'MARATONA'),
('Meia Maratona de Recife',                  '2026-11-28', 'Recife - PE', 'MARATONA'),
('Maratona de Vitória',                      '2026-12-10', 'Vitória - ES', 'MARATONA'),
('Maratona de Sorocaba',                     '2026-07-02', 'Sorocaba - SP', 'MARATONA'),
('Maratona de Santos',                       '2026-09-18', 'Santos - SP', 'MARATONA'),
('Maratona de Joinville',                    '2026-10-10', 'Joinville - SC', 'MARATONA'),

('Trail Running Mantiqueira',                '2027-01-11', 'Campos do Jordão - SP', 'TRAIL'),
('Trail Serra Gaúcha',                       '2027-02-15', 'Gramado - RS', 'TRAIL'),
('Trail Chapada Diamantina',                 '2027-03-22', 'Lençóis - BA', 'TRAIL'),
('Trail do Itacolomi',                       '2027-04-18', 'Ouro Preto - MG', 'TRAIL'),
('Trail Serra do Mar',                       '2027-05-30', 'Paranapiacaba - SP', 'TRAIL'),
('Trail Pedra Azul',                         '2027-06-15', 'Domingos Martins - ES', 'TRAIL'),
('Trail Vale do Pati',                       '2027-07-25', 'Chapada Diamantina - BA', 'TRAIL'),
('Trail Floresta da Tijuca',                 '2027-08-12', 'Rio de Janeiro - RJ', 'TRAIL'),
('Trail Aparados da Serra',                  '2027-09-28', 'Cambará do Sul - RS', 'TRAIL'),
('Trail Pico da Bandeira',                   '2027-10-05', 'Alto Caparaó - MG', 'TRAIL'),
('Trail Serra da Canastra',                  '2027-11-08', 'São Roque de Minas - MG', 'TRAIL'),
('Trail Costa Verde',                        '2027-01-19', 'Angra dos Reis - RJ', 'TRAIL'),
('Trail Ilha Bela',                          '2027-03-07', 'Ilhabela - SP', 'TRAIL'),
('Trail Serra Catarinense',                  '2027-04-13', 'Urubici - SC', 'TRAIL'),
('Trail Estrada Real',                       '2027-06-03', 'Tiradentes - MG', 'TRAIL');

INSERT INTO Inscricoes (id_atleta, id_competicao) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10),
(11, 11),
(12, 12),
(13, 13),
(14, 14),
(15, 15),
(16, 16),
(17, 17),
(18, 18),
(19, 19),
(20, 20),
(21, 21),
(22, 22),
(23, 23),
(24, 24),
(25, 25),
(26, 26),
(27, 27),
(28, 28),
(29, 29),
(30, 30);