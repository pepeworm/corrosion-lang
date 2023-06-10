"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

export default function DocLayout({ children }) {
	const url = usePathname();
	const page = "/" + url.match(/([^\/]*)$/)[1];
	const [sidebarLinks, setSidebarLinks] = useState(false);

	useEffect(() => {
		fetch("/data/docs.json")
			.then((res) => res.text())
			.then((text) => {
				const data = JSON.parse(text);

				for (const header in data) {
					for (let i = 0; i < data[header].length; i++) {
						if (data[header][i][1] == page) {
							data[header][i][2] = true;

							break;
						}
					}
				}

				setSidebarLinks(data);
			});
	}, []);

	return (
		<main>
			<div>
				<section className="relative">
					{sidebarLinks ? (
						<Sidebar loaded={true} sections={sidebarLinks} setSections={setSidebarLinks} />
					) : (
						<Sidebar loaded={false} sections={sidebarLinks} setSections={setSidebarLinks} />
					)}
				</section>

				<section className="relative">{children}</section>
			</div>
		</main>
	);
}
