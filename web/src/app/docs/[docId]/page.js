"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Home() {
	const url = usePathname();
	const currPage = url.match(/([^\/]*)$/)[1];
	const mdPath = `@/data/docs/${currPage}.md`;

	const [content, setContent] = useState();



	return (
		<section className="pt-14 pl-[20.5rem]">
			<div className="text-left ml-16">
				{/* <h1 className="gradient header">{content}</h1> */}
				{/* <h1 className="header">A C-like Language with Fragments of Rust</h1> */}
			</div>
		</section>
	);
}
