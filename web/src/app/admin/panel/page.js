"use client";

import { getCookie, hasCookie } from "cookies-next";

export default function Home() {
	if (!hasCookie("admin_id") || getCookie("admin_id") !== process.env.ADMIN_ID) {
		window.location.href = "/";

		return <></>;
	}

	return (
		<section>
			<form>
				<p>Test</p>
			</form>
		</section>
	);
}
