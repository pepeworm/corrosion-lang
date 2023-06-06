import { useEffect, useState } from "react";
import Link from "next/link";
import Searchbar from "@/components/searchbar/Searchbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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

	useEffect(() => {}, [search]);

	function closeModal() {
		setModalState((prev) => !prev);
	}

	return (
		<dialog
			open={modalState ? true : false}
			className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-bg-secondary px-6 py-4 border border-border rounded"
		>
			<div className="relative pt-8">
				<FontAwesomeIcon
					icon={faXmark}
					className="text-xl absolute top-0 right-0 cursor-pointer text-text-dangerous"
					onClick={(e) => {
						closeModal();
					}}
				/>

				<Searchbar placeholder="Search" fullWidth={true} searchInput={search} setSearchInput={setSearch} />

				<div className="text-center rounded text-text-body mt-4 border border-border px-6 pb-6 bg-bg-secondary">
					{Object.keys(searchResults).length ? (
						Object.keys(searchResults).map((results, searchIdx) => {
							return (
								<div key={searchIdx}>
									<h3 className="text-text-body text-left mt-4">{results}</h3>

									<div className="flex flex-col justify-center items-start">
										{searchResults[results].map((result, resIdx) => {
											const adjResIdx = searchIdx + resIdx;
											const title = result[0];
											const link = result[1];

											return (
												<Link
													key={adjResIdx}
													href={link}
													className="border border-border px-4 py-2 rounded flex flex-row justify-between items-center w-full mt-4 transition-colors duration-200 hover:text-text-header hover:bg-bg-tertiary"
												>
													{title}

													<FontAwesomeIcon icon={faArrowRight} />
												</Link>
											);
										})}
									</div>

									{/* {searchIdx < Object.keys(searchResults).length - 1 && ( */}
									{/* <hr className="mt-7 mb-4 border-b border-border" /> */}
									{/* )} */}
								</div>
							);
						})
					) : (
						<h3 className="mt-6">No Results</h3>
					)}
				</div>
			</div>
		</dialog>
	);
}
