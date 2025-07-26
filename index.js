"use strict";

const readline = require("node:readline/promises");
const { host, port } = require("./config");
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

async function prompt() {
	let sw = false;
	while (true) {
		const res = await rl.question("prompt:");
		console.log(`user input: ${res}`);
		if ("quit" === res) {
			sw = true;
		} else if ("models" == res) {
			await models();
		}
		if (sw) {
			rl.close();
			break;
		}
	}
}

prompt();

/*

source: index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
