"use strict";

const readline = require("node:readline/promises");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

async function prompt() {
	let sw = false;
	while (true) {
		const res = await rl.question("prompt:");
		console.log(`user input: ${res}`);
		if ("quit" === res) {
			sw = true;
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
