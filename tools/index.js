"use strict";

const desDumpInputFile = (
"Creates a lammps input file given the system temperature in Kelvins and the " +
"pressure in bar."
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
];

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
	const { message } = d;
	data.messages.push(message);
	console.log(message);
	const { tool_calls } = message;
	if (tool_calls) {
		const [ tool_call, ...rest ] = tool_calls;
		const { function: fun } = tool_call;
		const { name: name, arguments: args } = fun;
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
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(finalResponse);
				});
			});
		}
	} else {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(d);
			});
		});
	}
}

// dumps lammps input file given the Temperature T in Kelvins and the Pressure P in bar
async function dumpInputFile(data) {
	const { T, P } = data;
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
			resolve(input);
		});
	});
}

const toolHandles = new Map([
	[
		"dumpInputFile", dumpInputFile
	],
]);

module.exports = { models, chat, tools};

/*

source: tools/index.js
author: @misael-diaz

Copyright (c) 2025 Misael Diaz-Maldonado
MIT License

*/
