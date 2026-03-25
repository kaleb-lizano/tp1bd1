USE [TareaProgramada];
GO

CREATE PROCEDURE [dbo].[usp_InsertarEmpleado]
	@inNombre VARCHAR(128)
	, @inSalario MONEY
	, @outResultCode INT OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
		IF (EXISTS (
			SELECT 1
			FROM [dbo].[Empleado] AS E
			WHERE (E.Nombre = @inNombre)
		))
		BEGIN
			SET @outResultCode = 50001;
			RETURN;
		END

		INSERT [dbo].[Empleado] (
			Nombre
			, Salario
		)

		VALUES (
			@inNombre
			, @inSalario
		);

		SET @outResultCode = 0;
	END TRY

	BEGIN CATCH
		SET @outResultCode = 50002;
	END CATCH
END;
GO
