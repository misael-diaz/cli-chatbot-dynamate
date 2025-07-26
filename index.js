"use strict";

const readline = require("node:readline/promises");
const { host, port, model } = require("./config");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

async function models() {
	const uri = `http://${host}:${port}/api/tags`;
	const res = await fetch(uri);
	const dat = await res.json();
	console.log(dat);
}

async function chat(msg) {
	const data = {
		model: model,
		messages: [
			{
				role: "user",
				content: msg,
			},
		],
		stream: false,
	};
	const uri = `http://${host}:${port}/api/chat`;
	const res = await fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const dat = await res.json();
	console.log(dat);
}

async function prompt() {
	let sw = false;
	while (true) {
		const res = await rl.question("prompt:");
		if ("quit" === res) {
			sw = true;
		} else if ("models" == res) {
			await models();
		} else {
			await chat(res);
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
