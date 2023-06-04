"use client";

import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

export default function DocLayout({ children }) {
	const [sidebarLinks, setSidebarLinks] = useState({
		"Getting Started": [
			["Installation", "/installation", true], // title of docs page, link, active
			["doc II", "/doc2", false],
			["doc III", "/doc3", false],
		],
		Routing: [
			["doc IV", "/doc4", false],
			["doc V", "/doc5", false],
			["doc VI", "/doc6", false],
		],
		Testing: [
			["doc VII", "/doc7", false],
			["doc VIII", "/doc8", false],
			["doc IX", "/doc9", false],
		],
		Compiling: [
			["doc X", "/doc10", false],
			["doc XI", "/doc11", false],
			["doc XII", "/doc12", false],
		],
		"Function Calls": [
			["doc XIII", "/doc13", false],
			["doc XIV", "/doc14", false],
			["doc XV", "/doc15", false],
		],
	});

	return (
		<main>
			<div>
				<section className="relative">
					<Sidebar
						sections={sidebarLinks}
						setSections={setSidebarLinks}
					/>
				</section>

				<section className="relative">{children}</section>
			</div>
		</main>
	);
}
