"use strict";

const { host, port, model } = require("../config");
const { models, chat, dumpInputFile, tools } = require("../tools");

async function test() {
	const T = 298;
	const P = 1;
	const res = await dumpInputFile(T, P);
	console.log(res);
}

if (!model.length) {
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
