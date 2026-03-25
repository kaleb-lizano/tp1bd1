const sql = require('mssql');
const config = require('../config');

async function insertarEmpleado(req, res, next) {
    try {
        const { nombre, salario } = req.body;
        const conexion = await sql.connect(config.sql);
        const result = await conexion.request()
            .input('nombre', sql.VarChar, nombre)
            .input('salario', sql.Money, salario)
            .execute('usp_InsertarEmpleado');

        const data = (result.recordset && result.recordset.length > 0) ? result.recordset[0] : { message: 'Empleado agregado exitosamente' };
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    insertarEmpleado
};