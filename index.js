"use strict";

const readline = require("node:readline/promises");
const { host, port, model } = require("./config");
const { models, chat, tools } = require("./tools");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

async function prompt() {
	let sw = false;
	const data = {
		model: model,
		messages: [],
		tools: tools,
		stream: false,
	};
	while (true) {
		const res = await rl.question("dynamate:");
		if ("quit" === res) {
			sw = true;
		} else if ("models" == res) {
			await models(host, port);
		} else {
			const msg = res;
			data.messages.push({
				role: "user",
				content: msg,
			});
			await chat(host, port, data);
		}
		if (sw) {
			rl.close();
			break;
		}
	}
}

if (!model.length) {
	console.err(`you need to provide a model name in .env file`);
} else {
	prompt();
}

/*

source: index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
