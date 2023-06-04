import { useState } from "react";
import Link from "next/link";
import Searchbar from "@/components/searchbar/Searchbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SearchModal(props) {
	let { modalState, setModalState } = props;
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState({
		Installation: [
			["Getting Started", "/docs/getting-started"],
			["Syntax Highlighting", "/docs/syntax-highlighting"],
		],
		Syntax: [["Basic Syntax", "/docs/basic-syntax"]],
	});

	function closeModal() {
		setModalState((prev) => !prev);
	}

	return (
		<dialog
			open={modalState ? true : false}
			className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 bg-bg-secondary px-6 py-4 border border-border rounded"
		>
			<div className="relative pt-8">
				<FontAwesomeIcon
					icon={faXmark}
					className="text-xl absolute top-0 right-0 cursor-pointer text-text-dangerous"
					onClick={(e) => {
						closeModal();
					}}
				/>

				<Searchbar
					placeholder="Search"
					fullWidth={true}
					searchInput={search}
					setSearchInput={setSearch}
				/>

				<div className="text-center text-text-body mt-4 border border-border px-6 py-4 bg-bg-tertiary">
					{Object.keys(searchResults).map((results, searchIdx) => {
						return (
							<div key={searchIdx}>
								<h3 className="font-bold text-text-header text-lg">
									{results}
								</h3>

								<div className="flex flex-col justify-center items-center">
									{searchResults[results].map(
										(result, resIdx) => {
											const adjResIdx =
												searchIdx + resIdx;
											const title = result[0];
											const link = result[1];

											return (
												<Link
													key={adjResIdx}
													href={link}
													className="mt-2 transition-colors duration-200 hover:text-text-header"
												>
													{title}
												</Link>
											);
										}
									)}
								</div>

								{searchIdx <
									Object.keys(searchResults).length - 1 && (
									<hr className="my-4 border-b border-border" />
								)}
							</div>
						);
					})}
				</div>
			</div>
		</dialog>
	);
}
