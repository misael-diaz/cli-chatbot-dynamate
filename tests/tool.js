"use strict";

const config = require("../config");
const { llm: llm, api: api } = config;
const { models, chat, tools } = require("../tools");

// chat with history and tool calling
async function test() {
	const request = (
		"Create a lammps input file for a system of temperature of 298 Kelvins " +
		"and a pressure of 1 bar."
	);
	const data = {
		model: llm.model,
		messages: [
			{
				role: "user",
				content: request,
			},
		],
		tools: tools,
		stream: false,
	};
	const route = "api/chat";
	const d = await chat({
		llm: {
			model: llm.model,
			host: llm.host,
			port: llm.port,
			route: route,
		},
		api: api,
		data: data,
	});
	data.messages.push({
		role: "user",
		content: "thank you for your assistance",
	});
	const fd = await chat({
		llm: {
			model: llm.model,
			host: llm.host,
			port: llm.port,
			route: route,
		},
		api: api,
		data: data,
	});
}

if (!llm.model.length) {
	console.err(`you need to provide a model name in .env file`);
} else {
	test();
}

/*

source: test/tool.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
