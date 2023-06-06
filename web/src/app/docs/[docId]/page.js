"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function Home() {
	const url = usePathname();
	const [content, setContent] = useState("# Loading...");
	const mdPath = `/data${url}.mdx`;

	useEffect(() => {
		fetch(mdPath)
			.then((res) => res.text())
			.then((text) => setContent(text));
	}, []);

	return (
		<section className="pt-14 pl-[20.5rem]">
			<div className="text-left ml-16">
				<ReactMarkdown className="markdown" children={content} />
			</div>
		</section>
	);
}
