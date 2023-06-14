"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown, faSignOut, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/Modal.jsx";
import Button from "@/components/button/Button.jsx";
import { getCookie, deleteCookie } from "../actions.js";

export default function Home() {
	const [sections, setSections] = useState({});
	const [newSection, setNewSection] = useState("");
	const [sectionSelection, setSectionSelection] = useState(null);
	const [showSectionDropdown, setShowSectionDropdown] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [mdData, setMdData] = useState(null);
	const [actionTab, setActionTab] = useState("add");
	const [isModalOpen, setIsModalOpen] = useState(false);

	getCookie("admin_id").then((res) => {
		if (res.value === undefined || res.value !== process.env.ADMIN_ID) {
			window.location.href = "/";

			return <></>;
		}
	});

	function urlFriendlyTitle(rawTitle) {
		const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
		const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
		const p = new RegExp(a.split("").join("|"), "g");

		return rawTitle
			.toString()
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(p, (c) => b.charAt(a.indexOf(c)))
			.replace(/&/g, "-and-")
			.replace(/[^\w\-]+/g, "")
			.replace(/\-\-+/g, "-")
			.replace(/^-+/, "")
			.replace(/-+$/, "");
	}

	useEffect(() => {
		fetch("/api/data", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((text) => {
				setSections(text);
			});
	}, []);

	return (
		<section className="pt-14">
			<Modal
				content={
					<div className="m-auto flex flex-col justify-center items-center">
						<h1 className="mb-6">Preview</h1>

						<div className="border border-border rounded w-full mb-12">
							<ReactMarkdown
								className="markdown preview pt-8 pb-6 pl-8 pr-6"
								children={`${sectionSelection} > [${title}](/docs/${urlFriendlyTitle(
									title
								)}/)\n# ${title}\n---\n${body}`}
							/>
						</div>

						<Button
							onClick={(e) => {
								setIsModalOpen((prev) => !prev);
							}}
							content={<span className="text-text-body">Cancel</span>}
							icon={<FontAwesomeIcon icon={faXmark} className="text-text-body" />}
							fullWidth={true}
							bgColor="bg-bg-secondary"
							margin="mb-4"
						/>

						<Button
							onClick={(e) => {
								e.preventDefault();

								const link = urlFriendlyTitle(title);

								fetch("/api/data", {
									method: "POST",
									body: JSON.stringify({
										section: sectionSelection,
										link: link,
										title: title,
										fileData: `${sectionSelection} > [${title}](/docs/${link}/)\n# ${title}\n---\n${body}`,
									}),
								})
									.then((res) => res.status)
									.then((status) => {
										if (status === 200) {
											window.location.href = `/docs/${link}`;
										}
									});
							}}
							content={<span className="text-bg-secondary">Submit</span>}
							icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-secondary" />}
							fullWidth={true}
							bgColor="bg-text-highlight"
						/>
					</div>
				}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>

			{actionTab == "add" ? (
				<div>
					<form
						className="flex flex-col justify-center items-center"
						onSubmit={(e) => {
							e.preventDefault();

							setIsModalOpen((prev) => !prev);
						}}
					>
						<h1 className="mb-6">Admin Panel</h1>

						<div className="w-[35rem]">
							<div className="relative mb-4">
								<div
									onClick={(e) => setShowSectionDropdown((prev) => !prev)}
									className="bg-bg-secondary cursor-pointer flex flex-row justify-between items-center text-text-body w-full border border-border rounded px-3 py-1.5"
								>
									<span>{sectionSelection ? sectionSelection : "Select Section"}</span>

									<FontAwesomeIcon
										icon={faCaretDown}
										className={`transition-transform duration-200 ${
											showSectionDropdown && "rotate-180"
										}`}
									/>
								</div>

								{sections && (
									<ul
										className={`${
											showSectionDropdown ? "z-20 opacity-100" : "z-[-1] opacity-0"
										} transition-opacity duration-200 flex flex-col justify-center items-center absolute left-0 right-0 gap-2 bg-bg-secondary border border-border rounded pt-2 pb-3.5 cursor-pointer drop-shadow-xl`}
									>
										{Object.keys(sections).map((section, idx) => {
											return (
												<li
													key={idx}
													className="text-text-body transition-colors duration-200 hover:text-text-header"
													onClick={(e) => {
														setSectionSelection(section);
														setShowSectionDropdown(false);
													}}
												>
													{section}
												</li>
											);
										})}

										<li className="w-full flex flex-row justify-center items-center gap-2">
											<span className="text-text-body">Other:</span>

											<div className="w-1/2 rounded border border-border px-3 py-1.5 text-text-body flex flex-row justify-center items-center gap-2">
												<input
													value={newSection}
													onChange={(e) => {
														setNewSection(e.target.value);
													}}
													type="text"
													className="w-full outline-none bg-bg-secondary"
													placeholder="Section Name"
												/>

												<FontAwesomeIcon
													icon={faArrowRight}
													className="text-text-highlight"
													onClick={(e) => {
														setShowSectionDropdown(false);
														setSectionSelection(newSection);
													}}
												/>
											</div>
										</li>
									</ul>
								)}
							</div>

							<input
								className="w-full py-1.5 px-3 border border-border rounded outline-none bg-bg-secondary text-text-body mb-4"
								placeholder="Title"
								required
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>

							<textarea
								className="mb-4 w-full block h-24 outline-none border border-border rounded bg-bg-secondary text-text-body py-1.5 px-3"
								placeholder="Body"
								required
								value={body}
								onChange={(e) => {
									setBody(e.target.value);
								}}
							></textarea>

							<Button
								content={<span className="text-bg-primary">Preview</span>}
								icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-primary" />}
								fullWidth={true}
								bgColor="bg-text-highlight"
								margin="mb-4"
							/>

							<div
								className="cursor-pointer mb-4 w-full flex flex-row justify-between items-center border border-border rounded px-3 py-1.5 bg-text-dangerous"
								onClick={(e) => {
									deleteCookie("admin_id").then(() => {
										window.location.href = "/";
									});
								}}
							>
								<span className="text-bg-primary">Logout</span>

								<FontAwesomeIcon icon={faSignOut} className="text-bg-primary" />
							</div>
						</div>
					</form>
				</div>
			) : (
				<form></form>
			)}
		</section>
	);
}
