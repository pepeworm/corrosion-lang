"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function Home() {
	const url = usePathname();
	const currPage = url.match(/([^\/]*)$/)[1];

	const [content, setContent] = useState();

	useEffect(() => {
		const mdPath = `@/data/docs/${currPage}.md`;

		fetch(mdPath)
			.then((res) => res.text())
			.then((text) => setContent(text));
	}, []);

	return (
		<section className="pt-14 pl-[20.5rem]">
			<div className="text-left ml-16">
				<ReactMarkdown source />
				{/* <h1 className="gradient header">{content}</h1> */}
				{/* <h1 className="header">A C-like Language with Fragments of Rust</h1> */}
			</div>
		</section>
	);
}
