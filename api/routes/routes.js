"use strict";

const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

const { getAllUser, createUser } = userController;

router.get("/users/getAllEmpleado", getAllUser);

module.exports = {
	routes: router,
};
