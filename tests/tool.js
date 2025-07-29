"use strict";

const { host, port, model } = require("../config");
const { models, chat, dumpInputFile, tools } = require("../tools");

async function test0() {
	const T = 298;
	const P = 1;
	const res = await dumpInputFile(T, P);
	console.log(res);
}

async function test1() {
	const request = (
		"Create a lammps input file for a system of temperature of 298 Kelvins " +
		"and a pressure of 1 bar."
	);
	const data = {
		model: model,
		messages: [
			{
				role: "user",
				content: request,
			},
		],
		tools: tools,
		stream: false,
	};
	const d = await chat(host, port, data);
	console.log(d);
}


if (!model.length) {
	console.err(`you need to provide a model name in .env file`);
} else {
	test0();
	test1();
}

/*

source: test/tool.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
