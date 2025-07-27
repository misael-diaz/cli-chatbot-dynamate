"use strict";

async function models(host, port) {
	const uri = `http://${host}:${port}/api/tags`;
	const res = await fetch(uri);
	const dat = await res.json();
	console.log(dat);
}

async function chat(host, port, data) {
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

module.exports = { models, chat };

/*

source: tools/index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
