"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Button from "@/components/button/Button.jsx";
import { setCookie } from "./actions.js";

export default function Home() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const username = e.target[0].value;
				const password = e.target[1].value;

				if (username == process.env.USERNAME && password == process.env.PASSWORD) {
					setCookie("admin_id", process.env.ADMIN_ID).then(() => {
						window.location.href = "/admin/panel";
					});
				} else {
					window.location.href = "/";
				}
			}}
			className="pt-14 flex flex-col justify-center items-center max-w-3/5 m-auto py-4 px-6"
		>
			<h1 className="mb-6">Admin Login</h1>

			<div className="flex flex-col justify-center items-center gap-4">
				<div className="flex flex-row justify-center items-center border border-border rounded bg-bg-secondary">
					<span className="px-3 py-1.5 border-r border-r-border">
						<FontAwesomeIcon icon={faUser} className="text-text-footer" />
					</span>

					<input
						placeholder="Username"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						required
						className="bg-transparent text-text-body px-3 py-1.5 outline-none w-full"
					/>
				</div>

				<div className="flex flex-row justify-center items-center border border-border rounded bg-bg-secondary">
					<span className="px-3 py-1.5 border-r border-r-border">
						<FontAwesomeIcon icon={faLock} className="text-text-footer" />
					</span>

					<input
						placeholder="Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
						type="password"
						className="bg-transparent text-text-body px-3 py-1.5 outline-none w-full"
					/>
				</div>

				<Button
					content={<span className="text-bg-primary">Login</span>}
					bgColor="bg-text-highlight"
					icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-primary" />}
					fullWidth={true}
				/>
			</div>
		</form>
	);
}
