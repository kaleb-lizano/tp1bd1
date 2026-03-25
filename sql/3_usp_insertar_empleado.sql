USE [TareaProgramada];
GO

CREATE PROCEDURE [dbo].[usp_InsertarEmpleado]
	@Nombre VARCHAR(128),
	@Salario MONEY
AS
BEGIN
	INSERT [dbo].[Empleado] ([Nombre], [Salario])
	VALUES (@Nombre, @Salario);
END;
GO