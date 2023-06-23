import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const dataPath = path.join(process.cwd(), "src/app/api/data.json");

function getMdxPath(fileName) {
	return path.join(process.cwd(), `public/data/docs/${fileName}.mdx`);
}

function urlFriendlyTitle(rawTitle) {
	const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
	const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
	const p = new RegExp(a.split("").join("|"), "g");

	return rawTitle
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(p, (c) => b.charAt(a.indexOf(c)))
		.replace(/&/g, "-and-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\-\-+/g, "-")
		.replace(/^-+/, "")
		.replace(/-+$/, "");
}

export async function GET() {
	const data = readFileSync(dataPath, { encoding: "utf-8" });

	return new Response(data);
}

export async function POST(request) {
	let rawData = readFileSync(dataPath, { encoding: "utf-8" });
	let currData = JSON.parse(rawData);

	const data = await request.json();
	const section = data.section;
	const link = data.link;
	const title = data.title;
	const fileData = data.fileData;

	let foundSection = false;

	Object.keys(currData).map((currSection) => {
		if (section === currSection) {
			foundSection = true;
			currData[currSection].push([title, `/${link}`, false]);

			return;
		}
	});

	if (!foundSection) {
		let start = rawData.slice(0, rawData.length - 2);
		start += `,"${section}": [
			["${title}", "/${link}", false]
		]}`;

		rawData = start;
		currData = JSON.parse(rawData);
	}
	
	if (!existsSync(getMdxPath(link))) {
		writeFileSync(dataPath, JSON.stringify(currData));
	}

	writeFileSync(getMdxPath(link), fileData);

	return new NextResponse(200);
}

export async function PUT(request) {
	let sections = JSON.parse(readFileSync(dataPath, { encoding: "utf-8" }));

	const data = await request.json();
	const del = data.del;

	const delFiles = [];

	// sort del in a descending order

	for (let i = 0; i < del.length; i++) {
		for (let j = 0; j < del.length - i - 1; j++) {
			if (del[j] < del[j + 1]) {
				const tmp = del[j];
				del[j] = del[j + 1];
				del[j + 1] = tmp;
			}
		}
	}

	del.forEach((item) => {
		if (item.includes(",")) {
			const pIdx = parseInt(item.split(",")[0]);
			const cIdx = parseInt(item.split(",")[1]);

			delFiles.push(urlFriendlyTitle(sections[Object.keys(sections)[pIdx]][cIdx][0]));
			sections[Object.keys(sections)[pIdx]].splice(cIdx, 1);
		}
	});

	del.forEach((item) => {
		if (!item.includes(",")) {
			const idx = parseInt(item);

			delete sections[Object.keys(sections)[idx]];
		}
	});

	delFiles.map((file) => {
		unlinkSync(getMdxPath(file));
	});

	writeFileSync(dataPath, JSON.stringify(sections));

	return new NextResponse(200);
}
