const sql = require("mssql");
const config = require("../config");

async function obtenerEmpleados(req, res, next) {
	try {
		const conexion = await sql.connect(config.sql);
		const resultado = await conexion
			.request()
			.execute("usp_ObtenerEmpleadosAscendente");

		const data =
			resultado.recordset && resultado.recordset.length > 0
				? resultado.recordset
				: { message: "No se encontraron empleados" };
		res.status(200).json(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

async function insertarEmpleado(req, res, next) {
	try {
		const { nombre, salario } = req.body;
		const conexion = await sql.connect(config.sql);
		const resultado = await conexion
			.request()
			.input("nombre", sql.VarChar, nombre)
			.input("salario", sql.Money, salario)
			.execute("usp_InsertarEmpleado");

		const data =
			resultado.recordset && resultado.recordset.length > 0
				? resultado.recordset[0]
				: { message: "Empleado agregado exitosamente" };
		res.status(201).json(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

module.exports = {
	obtenerEmpleados,
	insertarEmpleado,
};
