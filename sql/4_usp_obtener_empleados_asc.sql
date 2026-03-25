USE [TareaProgramada];
GO

CREATE PROCEDURE [dbo].[usp_ObtenerEmpleadosAscendente]
AS
BEGIN
    SELECT [Id], [Nombre], [Salario] FROM [dbo].[Empleado]
    ORDER BY [Nombre] ASC;
END;
GO