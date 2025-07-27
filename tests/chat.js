"use strict";

const { host, port, model } = require("../config");

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
	await chat(data);
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
