-- Cria o usuário para a aplicação
CREATE ROLE dia3 WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1;

-- DROP DATABASE db_dia3;

CREATE DATABASE db_dia3˙
    WITH
    OWNER = dia3
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE db_dia3
    IS 'Banco de dados do terceiro dia de treinamento';

CREATE TABLE public.BICICLETAS
(
    CODIGO character(12) NOT NULL,
    ATIVO character(1) NOT NULL,
    PRIMARY KEY (CODIGO)
);

ALTER TABLE public.BICICLETAS
    OWNER to dia3;

CREATE TABLE public.USUARIOS
(
    CODIGO numeric(10, 0) NOT NULL,
    NOME character(60) NOT NULL,
    TELEFONE character(15),
    EMAIL character(100),
    SALDO_CREDITOS numeric(12, 2) NOT NULL,
    PRIMARY KEY (CODIGO)
);

ALTER TABLE public.USUARIOS
    OWNER to dia3;

CREATE TABLE public.VIAGENS
(
    ID numeric(10) NOT NULL,
    CODIGO_USUARIO numeric(10) NOT NULL,
    CODIGO_BICICLETA character(12) NOT NULL,
    DATA_INICIO timestamp without time zone NOT NULL,
    DATA_FIM timestamp without time zone,
    PRECO numeric(12, 2),
    PRIMARY KEY (ID),
    CONSTRAINT FK_VIAGEM_USUARIO FOREIGN KEY (CODIGO_USUARIO)
        REFERENCES public.USUARIOS (CODIGO) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT FK_VIAGEM_BICICLETA FOREIGN KEY (CODIGO_BICICLETA)
        REFERENCES public.BICICLETAS (CODIGO) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.VIAGENS
    OWNER to dia3;

CREATE SEQUENCE public.usuarios_sequence
  start 1
  increment 1;