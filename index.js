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

async function chat(data) {
	const uri = `http://${host}:${port}/api/chat`;
	const res = await fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const d = await res.json();
	const msg = d.message;
	data.messages.push(msg);
	console.log(msg);
}

async function prompt() {
	let sw = false;
	const data = {
		model: model,
		messages: [],
		stream: false,
	};
	while (true) {
		const res = await rl.question("prompt:");
		if ("quit" === res) {
			sw = true;
		} else if ("models" == res) {
			await models();
		} else {
			const msg = res;
			data.messages.push({
				role: "user",
				content: msg,
			});
			await chat(data);
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
