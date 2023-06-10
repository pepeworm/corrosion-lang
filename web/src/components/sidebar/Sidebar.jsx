import { useState } from "react";
import Link from "next/link";
import SearchModal from "@/components/searchbar/SearchModal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(props) {
	const { loaded, sections, setSections } = props;
	const [modalState, setModalState] = useState(false);

	return (
		<div>
			<SearchModal
				modalState={modalState}
				setModalState={setModalState}
				sections={sections}
				setSections={setSections}
			/>

			<nav className="z-30 overscroll-contain bg-bg-primary min-w-[20rem] w-[20rem] px-12 pt-8 pb-4 overflow-y-scroll fixed h-[calc(100vh-51px)] left-0 top-[51px] bottom-0 border-r border-border text-text-header">
				<div className="mb-6">
					<div
						className="border border-border bg-bg-secondary rounded cursor-pointer transition-colors duration-200 hover:bg-bg-tertiary"
						onClick={(e) => {
							setModalState((prev) => !prev);
						}}
					>
						<span className="px-3 py-1.5 border-r border-r-border sticky top-0">
							<FontAwesomeIcon icon={faSearch} className="text-text-footer" />
						</span>

						<span className="px-3 py-1.5 text-text-footer inline-block w-[10rem]">Search</span>
					</div>
				</div>

				{loaded &&
					Object.keys(sections).map((key, sectionIdx) => {
						const title = key;
						const titleLinks = sections[key];

						return (
							<div key={sectionIdx} className={`${sectionIdx != sections.length - 1 ? "mb-6" : ""}`}>
								<h3 className="font-bold mb-1.5 text-lg">{title}</h3>

								<ul className="border-l border-border">
									{titleLinks.map((link, linkIdx) => {
										const adjLinkIdx = link[0] + link[1] + sectionIdx + linkIdx;
										const linkTitle = link[0];
										const linkHref = link[1];
										const active = link[2];

										return (
											<li
												key={adjLinkIdx}
												className={`${
													linkIdx > 0 && linkIdx < titleLinks.length ? "mt-1.5" : ""
												}`}
											>
												<Link
													href={"/docs" + linkHref}
													className={`${
														active
															? "link border-l-2 border-text-highlight"
															: "text-text-footer transition-colors duration-200 hover:text-text-header"
													} pl-2.5`}
													onClick={(e) => {
														let sectionCpy = {
															...sections,
														};

														for (const header in sections) {
															for (let i = 0; i < sections[header].length; i++) {
																sectionCpy[header][i][2] = false;
															}
														}

														sectionCpy[title][linkIdx][2] = true;

														setSections(sectionCpy);
													}}
												>
													{linkTitle}
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
			</nav>
		</div>
	);
}
