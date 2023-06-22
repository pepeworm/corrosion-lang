"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/sidebar/Sidebar.jsx";

export default function DocLayout({ children }) {
	const url = usePathname();
	const page = "/" + url.match(/([^\/]*)$/)[1];
	const [sidebarLinks, setSidebarLinks] = useState(false);

	useEffect(() => {
		fetch("/api/data", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
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

				<section className="relative">
					<Image
						className="absolute blur-3xl right-0 top-[5rem] z-40"
						src="/images/logo_blur.png"
						width="50"
						height="50"
					/>
					{children}
				</section>
			</div>
		</main>
	);
}
