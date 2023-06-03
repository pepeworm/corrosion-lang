"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

export default function Home() {
	const [sidebarLinks, setSidebarLinks] = useState(
		{
			"Getting Started": [
				["doc1", "/docs", false], // title of docs page, link, active
				["doc2", "/docs", false],
				["doc3", "/docs", false]
			],
			"Routing": [
				["doc4", "/docs", true],
				["doc5", "/docs", false],
				["doc6", "/docs", false]
			]
		},
	);

	return (
		<main>
			<div>
				<section className="relative">
					<Sidebar sections={sidebarLinks} />
				</section>

				<section className="pt-20">
					<div className="text-center">
						<h1 className="gradient header">Getting Started with Corrosion</h1>
						{/* <h1 className="header">A C-like Language with Fragments of Rust</h1> */}
					</div>
				</section>
			</div>
		</main>
	);
}

// actual documentation in (pages)/