import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar(props) {
	const { placeholder, fullWidth, searchInput, setSearchInput } = props;

	return (
		<div className="border border-border bg-bg-secondary rounded flex flex-row justify-center items-center">
			<span className="px-3 py-1.5 border-r border-r-border">
				<FontAwesomeIcon icon={faSearch} className="text-text-footer" />
			</span>

			<input
				input="text"
				className={`px-3 py-1.5 bg-transparent outline-none font-normal text-text-footer ${
					fullWidth ? "w-full" : "w-[15rem]"
				}`}
				placeholder={placeholder}
				value={searchInput}
				onChange={(e) => {
					setSearchInput(e.target.value);
				}}
			/>
		</div>
	);
}
