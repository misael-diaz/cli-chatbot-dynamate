"use strict";

const { host, port, model } = require("../config");
const { models, chat, dumpInputFile, tools, toolHandles } = require("../tools");

async function test0() {
	const T = 298;
	const P = 1;
	const res = await dumpInputFile({ T, P });
	console.log(res);
}

// chat with history and tool calling
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
	const { message: chatMessage } = d;
	console.log(d);
	if (chatMessage.tool_calls) {
		const name = chatMessage.tool_calls[0].function.name;
		const args = chatMessage.tool_calls[0].function.arguments;
		const tool = toolHandles.get(name);
		if (tool) {
			const result = await tool(args);
			const toolMessage = {
				role: "tool",
				content: result,
				tool_name: name,
			};
			console.log(result);
			data.messages.push(toolMessage);
			const { tools, ...finalData } = data;
			const finalResponse = await chat(host, port, finalData);
			console.log(finalResponse);
		}
	}
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
