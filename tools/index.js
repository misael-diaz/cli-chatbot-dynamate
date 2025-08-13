"use strict";

const desDumpInputFile = (
"Creates a lammps input file given the system temperature in Kelvins and the " +
"pressure in bar."
);
const desDumpDataFile = (
"Creates a lammps data file given the molecule name, SMILES string, box-length, and " +
"molecule count."
);

const tools = [
	{
		type: "function",
		function: {
			name: "dumpInputFile",
			description: desDumpInputFile,
			parameters: {
				type: "object",
				properties: {
					T: {
						type: "float",
						description: "temperature in Kelvins",
					},
					P: {
						type: "float",
						description: "pressure in bar",
					}
				},
				required: [
					"T",
					"P",
				],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "dumpDataFile",
			description: desDumpDataFile,
			parameters: {
				type: "object",
				properties: {
					name: {
						type: "string",
						description: "molecule name",
					},
					smiles: {
						type: "string",
						description: "SMILES string",
					},
					length: {
						type: "float",
						description: "box-length in nanometers",
					},
					count: {
						type: "int",
						description: "molecule count",
					},
				},
				required: [
					"name",
					"smiles",
					"length",
					"count",
				],
			},
		},
	},
];

async function models(host, port) {
	const uri = `http://${host}:${port}/api/tags`;
	const res = await fetch(uri);
	const dat = await res.json();
}

async function chat(args) {
	const { llm, api, data } = args;
	const uri = `http://${llm.host}:${llm.port}/${llm.route}`;
	const res = await fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const d = await res.json();
	if ("api/generate" === llm.route) {
		const content = d.response;
		const response = {
			role: "assistant",
			content: content,
		};
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(response);
			});
		});
	}
	const { message } = d;
	data.messages.push(message);
	if (message.tool_calls) {
		const { tool_calls } = message;
		const [ tool_call, ...rest ] = tool_calls;
		const { function: fun } = tool_call;
		const { name: name, arguments: args } = fun;
		const tool = toolHandles.get(name);
		if (tool) {
			const result = await tool({ api: api, data: args });
			const toolMessage = {
				role: "tool",
				content: result.data,
				tool_name: name,
			};
			const userMessageIndex = (data.messages.length - 2);
			const userMessage = data.messages[userMessageIndex];
			const request = userMessage.content;
			const prmpt = `
			The following text is the user request: ${request}.
			Generate a response for the user request with the following data:
			${result.data}
			`;
			const compMessage = {
				role: "user",
				content: prmpt,
			};
			data.messages.push(toolMessage);
			const d = {
				model: llm.model,
				prompt: prmpt,
				stream: false,
			};
			const route = "api/generate";
			const finalResponse = await chat({
				llm: {
					model: llm.model,
					host: llm.host,
					port: llm.port,
					route: route,
				},
				api: api,
				data: d,
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(finalResponse);
				});
			});
		}
	} else {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(message);
			});
		});
	}
}

// dumps lammps input file given the Temperature T in Kelvins and the Pressure P in bar
async function dumpInputFile(p) {
	const { T, P } = p.data;
	const input = `
include "system.in.init"
read_data "system.data"
include "system.in.settings"
thermo 100
minimize 1.0e-5 1.0e-7 1000 10000
write_data system_minimized.data
include "system.in.constraints"
timestep        1 #fs
reset_timestep 0
thermo          1000
thermo_style    custom step time temp pe ke etotal enthalpy press lx vol density
velocity   all create ${T} 097865 dist gaussian
fix 1 all npt temp ${T} ${T} 100 iso ${P} ${P} 1000.0
run 1000000 # 1 ns
write_data system_npt_equil.data
unfix 1
fix 2 all nvt temp ${T} ${T} 100
unfix 2
dump 3 all dcd 1000 trajectory.dcd
run 500000 # 0.5 ns
write_data system_nvt_equil.data
`;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ data: input });
		});
	});
}

async function dumpDataFile(p) {
	const { api, data } = p;
	const { host, port } = api;
	const route = "api/tool/mosdef";
	const uri = `http://${api.host}:${api.port}/${route}`;
	const res = await fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const r = await res.json();
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ data: r.data });
		});
	});
}

const toolHandles = new Map([
	[
		"dumpInputFile", dumpInputFile
	],
	[
		"dumpDataFile", dumpDataFile
	],
]);

module.exports = { models, chat, tools};

/*

source: tools/index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
