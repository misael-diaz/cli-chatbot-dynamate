"use strict";

const dotenv = require("dotenv");
dotenv.config();

const config = {
	llm: {
		host: process.env.LLM_HOST || "127.0.0.1",
		port: process.env.LLM_PORT || 11434,
		model: process.env.LLM_MODEL || "",
	},
	api: {
		host: process.env.API_HOST || "127.0.0.1",
		port: process.env.API_PORT || 8080,
	},
};

module.exports = config;

/*

source: config/index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
