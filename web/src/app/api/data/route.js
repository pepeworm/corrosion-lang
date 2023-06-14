import { readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const dataPath = path.join(process.cwd(), "src/app/api/data.json");

function getMdxPath(fileName) {
	return path.join(process.cwd(), `public/data/docs/${fileName}.mdx`);
}

function getData() {
	const data = readFileSync(dataPath, { encoding: "utf-8" });

	return data;
}

export async function GET() {
	const data = getData();

	return new Response(data);
}

export async function POST(request) {
	let rawData = getData();
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

	writeFileSync(dataPath, JSON.stringify(currData));
	writeFileSync(getMdxPath(link), fileData);

	return new NextResponse(200);
}
