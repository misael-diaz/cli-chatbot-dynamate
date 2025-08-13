"use strict";

const config = require("../config");
const { host, port, model } = config.llm;
const { models, chat } = require("../tools");

async function test() {
	const data = {
		model: model,
		messages: [
			{
				role: "user",
				content: "hello there",
			},
		],
		stream: false,
	};
	const route = "api/chat";
	await chat(host, port, route, data);
}

if (!model.length) {
	console.err(`you need to provide a model name in .env file`);
} else {
	test();
}

/*

source: test/chat.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
