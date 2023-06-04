"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"; //and now it breaks if i try to import this

export default function Home(props) {
	const { params } = props;

	const mdPath = `@/markdown/${params.docId}.md`;
	const [content, setContent] = useState("### Loading...");

	// useEffect(() => {
	// 	fetch(mdPath)
	// 		.then((res) => res.text())
	// 		.then((text) => setContent(text));
	// }, []);

	return (
		<section className="pt-20">
			<div className="text-center">
				<h1 className="gradient header">{content}</h1>
			</div>
		</section>
	);
}
