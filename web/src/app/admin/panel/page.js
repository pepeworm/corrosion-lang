"use client";

import { useEffect, useState, createRef } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCaretDown, faSignOut, faXmark, faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/modal/Modal.jsx";
import Button from "@/components/button/Button.jsx";
import { getCookie, deleteCookie } from "../actions.js";

export default function Home() {
	// general

	const [actionTab, setActionTab] = useState("add");
	const [sections, setSections] = useState({});

	// add/edit tab

	const [showFileDropdown, setShowFileDropdown] = useState(false);
	const [fileSelection, setFileSelection] = useState("");
	const [showSectionDropdown, setShowSectionDropdown] = useState(false);
	const [newSection, setNewSection] = useState("");
	const [sectionSelection, setSectionSelection] = useState(null);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	// delete tab

	const [delRefs, setDelRefs] = useState({});
	const [deleteSelection, setDeleteSelection] = useState([]);

	getCookie("admin_id").then((res) => {
		if (res === undefined || res.value !== process.env.ADMIN_ID) {
			window.location.href = "/";

			return <></>;
		}
	});

	useEffect(() => {
		fetch("/api/data", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((text) => {
				setSections(text);

				let temp = {};

				Object.keys(text).map((section, sectionIdx) => {
					text[section].map((_, itemIdx) => {
						temp[`${sectionIdx},${itemIdx}`] = createRef();
					});
				});

				setDelRefs(temp);
			});
	}, []);

	useEffect(() => {
		const storageSection = window.localStorage.getItem("section");
		const storageTitle = window.localStorage.getItem("title");
		const storageBody = window.localStorage.getItem("body");

		if (storageSection || storageTitle || storageBody) {
			setSectionSelection(storageSection);
			setTitle(storageTitle);
			setBody(storageBody);
		}
	}, []);

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

	function handleDeleteSelection(target, rawId) {
		const id = rawId.toString();

		setDeleteSelection((prev) => {
			if (target.checked) {
				prev.push(id.toString());
			} else {
				prev.splice(prev.indexOf(id.toString()), 1);
			}

			return prev;
		});

		return;
	}

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
								setIsAddModalOpen((prev) => !prev);
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
							content={<span className="text-bg-secondary">Confirm</span>}
							icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-secondary" />}
							fullWidth={true}
							bgColor="bg-text-highlight"
						/>
					</div>
				}
				isModalOpen={isAddModalOpen}
				setIsModalOpen={setIsAddModalOpen}
			/>

			<h1 className="text-center w-full">Admin Panel</h1>

			<div className="max-w-[35rem] w-full flex flex-row justify-around items-center m-auto my-8 border-b border-b-border">
				<h2
					className={`${
						actionTab == "add" && "pb-[calc(0.5rem-1px)] gradient border-b border-b-text-highlight"
					} cursor-pointer text-base font-normal text-text-body pb-2`}
					onClick={(e) => {
						setActionTab("add");
					}}
				>
					Add/Edit Item
				</h2>
				<h2
					className={`${
						actionTab == "delete" && "pb-[calc(0.5rem-1px)] gradient border-b border-b-text-highlight"
					} cursor-pointer text-base font-normal text-text-body pb-2`}
					onClick={(e) => {
						setActionTab("delete");
					}}
				>
					Delete Item
				</h2>
			</div>

			{actionTab == "add" ? (
				<form
					className="flex flex-col justify-center items-center"
					onSubmit={(e) => {
						e.preventDefault();

						setIsAddModalOpen((prev) => !prev);
					}}
				>
					<div className="max-w-[35rem] w-full mb-8">
						<div className="relative mb-4">
							<div
								onClick={(e) => {
									setShowSectionDropdown(false);
									setShowFileDropdown((prev) => !prev);
								}}
								className="bg-bg-secondary cursor-pointer flex flex-row justify-between items-center text-text-body w-full border border-border rounded px-3 py-1.5"
							>
								<span>{fileSelection ? fileSelection : "Edit MDX File"}</span>

								<FontAwesomeIcon
									icon={faCaretDown}
									className={`transition-transform duration-200 ${showFileDropdown && "rotate-180"}`}
								/>
							</div>

							{sections && (
								<div
									className={`${
										showFileDropdown ? "z-20 opacity-100" : "z-[-1] opacity-0"
									} max-h-[40vh] overscroll-contain overflow-y-scroll transition-opacity duration-200 text-center absolute left-0 right-0 bg-bg-secondary border border-border rounded py-2 px-3 cursor-pointer drop-shadow-xl`}
								>
									{Object.keys(sections).map((section, sectionIdx) => {
										return (
											<div key={sectionIdx} className={`${sectionIdx && "mt-2"}`}>
												<span className="text-text-body font-bold">{section}</span>

												<div>
													{sections[section].map((item, itemIdx) => {
														return (
															<span
																key={`${sectionIdx},${itemIdx}`}
																className="block text-text-body transition-colors duration-200 hover:text-text-header"
																onClick={(e) => {
																	setFileSelection(item[0]);
																	setShowFileDropdown(false);

																	fetch("/api/fetchMdx", {
																		method: "POST",
																		body: JSON.stringify({
																			file: urlFriendlyTitle(item[0]),
																		}),
																	})
																		.then((res) => res.json())
																		.then((data) => {
																			setSectionSelection(section);
																			setTitle(item[0]);
																			setBody(data.body);
																		});
																}}
															>
																{item[0]}
															</span>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>

						<div className="relative mb-4">
							<div
								onClick={(e) => {
									setShowFileDropdown(false);
									setShowSectionDropdown((prev) => !prev);
								}}
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
													const section = e.target.value;

													setNewSection(section);
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
							value	={title}
							onChange={(e) => {
								const title = e.target.value;

								setTitle(title);
							}}
						/>

						<textarea
							className="mb-4 w-full block h-24 outline-none border border-border rounded bg-bg-secondary text-text-body py-1.5 px-3"
							placeholder="Body"
							required
							value={body}
							onChange={(e) => {
								const body = e.target.value;

								setBody(body);
							}}
						></textarea>

						<Button
							onClick={(e) => {
								e.preventDefault();

								window.localStorage.setItem("section", sectionSelection);
								window.localStorage.setItem("title", title);
								window.localStorage.setItem("body", body);
							}}
							content={<span className="text-text-body">Save Draft</span>}
							icon={<FontAwesomeIcon icon={faDownload} className="text-text-body" />}
							fullWidth={true}
							margin="mb-4"
						/>

						<Button
							content={<span className="text-bg-primary">Preview</span>}
							icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-primary" />}
							fullWidth={true}
							bgColor="bg-text-highlight"
							margin="mb-4"
						/>

						<Button
							onClick={(e) => {
								e.preventDefault();

								deleteCookie("admin_id").then(() => {
									window.location.href = "/";
								});
							}}
							content={<span className="text-bg-primary">Logout</span>}
							icon={<FontAwesomeIcon icon={faSignOut} className="text-bg-primary" />}
							fullWidth={true}
							bgColor="bg-text-danger"
						/>
					</div>
				</form>
			) : (
				<form
					className="flex flex-col justify-center items-center"
					onSubmit={(e) => {
						e.preventDefault();

						fetch("/api/data", {
							method: "PUT",
							body: JSON.stringify({
								del: deleteSelection,
							}),
						})
							.then((res) => res.status)
							.then((status) => {
								if (status === 200) {
									window.location.href = "/docs/installation";
								}
							});
					}}
				>
					<div className="max-w-[35rem] w-full mb-8">
						<div className="relative mb-4 bg-bg-secondary border border-border rounded text-text-body px-4 py-3">
							{Object.keys(delRefs).length &&
								Object.keys(sections).map((section, sectionIdx) => {
									return (
										<div className={`${sectionIdx > 0 && "mt-4"}`} key={sectionIdx}>
											<div className="flex flex-row justify-start items-center gap-1 cursor-pointer">
												<input
													type="checkbox"
													id={sectionIdx}
													name={sectionIdx}
													className="cursor-pointer mt-[-0.05rem] outline-none"
													onChange={(e) => {
														handleDeleteSelection(e.target, sectionIdx);

														for (let i = 0; i < sections[section].length; i++) {
															const adjIdx = `${sectionIdx},${i}`;

															if (e.target.checked) {
																if (!delRefs[adjIdx].current.checked) {
																	delRefs[adjIdx].current.checked = true;

																	handleDeleteSelection(
																		delRefs[adjIdx].current,
																		adjIdx
																	);
																}
															} else {
																delRefs[adjIdx].current.checked = false;

																handleDeleteSelection(delRefs[adjIdx].current, adjIdx);
															}
														}
													}}
												/>
												<label
													htmlFor={sectionIdx}
													className="cursor-pointer text-md font-bold select-none"
												>
													{section}
												</label>
											</div>

											<div className="ml-10">
												{sections[section].map((item, itemIdx) => {
													const adjIdx = `${sectionIdx},${itemIdx}`;

													return (
														<div
															className="flex flex-row justify-start items-center gap-1 cursor-pointer mt-1"
															key={adjIdx}
														>
															<input
																type="checkbox"
																id={adjIdx}
																name={adjIdx}
																className="cursor-pointer mt-[-0.05rem] outline-none"
																onChange={(e) => {
																	const parent = adjIdx.split(",")[0];

																	if (deleteSelection.indexOf(parent) === -1) {
																		handleDeleteSelection(e.target, adjIdx);
																	} else {
																		e.target.checked = true;
																	}
																}}
																ref={delRefs[adjIdx]}
															/>
															<label
																htmlFor={adjIdx}
																className="cursor-pointer text-md select-none"
															>
																{item[0]}
															</label>
														</div>
													);
												})}
											</div>
										</div>
									);
								})}
						</div>

						<Button
							content={<span className="text-bg-primary">Confirm</span>}
							icon={<FontAwesomeIcon icon={faArrowRight} className="text-bg-primary" />}
							fullWidth={true}
							bgColor="bg-text-highlight"
							margin="mb-4"
						/>

						<Button
							onClick={(e) => {
								e.preventDefault();

								deleteCookie("admin_id").then(() => {
									window.location.href = "/";
								});
							}}
							content={<span className="text-bg-primary">Logout</span>}
							icon={<FontAwesomeIcon icon={faSignOut} className="text-bg-primary" />}
							fullWidth={true}
							bgColor="bg-text-danger"
						/>
					</div>
				</form>
			)}
		</section>
	);
}
