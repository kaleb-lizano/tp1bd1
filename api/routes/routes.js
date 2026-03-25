"use strict";

const express = require("express");
const empleadoController = require("../controllers/empleadoController");
const router = express.Router();

// const { getAllUser, createUser } = userController; esto era del tutorial, lo voy a guardar por si acaso
// router.get("/users/getAllEmpleado", getAllUser);
const { insertarEmpleado } = empleadoController;

router.post("/empleados/insertarEmpleado", insertarEmpleado);

module.exports = {
	routes: router,
};
