USE [TareaProgramada];
GO

CREATE TABLE [dbo].[Empleado]
(
	Id INT IDENTITY(1,1) PRIMARY KEY
	, Nombre VARCHAR(128) NOT NULL
	, Salario MONEY NOT NULL
);
GO