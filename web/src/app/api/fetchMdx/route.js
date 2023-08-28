import { readFileSync } from "fs";
import path from "path";

function getMdxPath(fileName) {
	return path.join(process.cwd(), `public/data/docs/${fileName}.mdx`);
}

export async function POST(request) {
	const req = await request.json();
	const mdxPath = getMdxPath(req.file);
	const fData = readFileSync(mdxPath, { encoding: "utf-8" }).split("\n").splice(3);
	let body = "";

	for (let i = 0; i < fData.length; i++) {
		if (fData.length) {
			body += fData[i] + "\n";
		}
	}
	
	return new Response(
		JSON.stringify({
			body: body,
		})
	);
}
