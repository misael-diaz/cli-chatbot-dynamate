"use strict";

const dotenv = require("dotenv");
dotenv.config();

const config = {
	host: process.env.HOST || "127.0.0.1",
	port: process.env.PORT || 8080,
	model: process.env.MODEL || "",
};

module.exports = config;

/*

source: config/index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
