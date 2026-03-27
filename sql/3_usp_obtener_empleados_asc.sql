USE [TareaProgramada];
GO

CREATE PROCEDURE [dbo].[usp_ObtenerEmpleadosAscendente]
	@outResultCode INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		SELECT
			E.Id
			, E.Nombre
			, E.Salario
		FROM [dbo].[Empleado] AS E
		ORDER BY E.Nombre ASC;

		SET @outResultCode = 0;
	END TRY
	BEGIN CATCH
		SET @outResultCode = 50001;
	END CATCH
END;
GO
