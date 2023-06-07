import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar(props) {
	const { placeholder, fullWidth, searchInput, setSearchInput, allResults, setSearchResults } = props;

	return (
		<div className="border border-border bg-bg-secondary rounded flex flex-row justify-center items-center">
			<span className="px-3 py-1.5 border-r border-r-border">
				<FontAwesomeIcon icon={faSearch} className="text-text-footer" />
			</span>

			<input
				input="text"
				className={`px-3 py-1.5 bg-transparent outline-none font-normal text-green-400 ${
					fullWidth ? "w-full" : "w-[15rem]"
				}`}
				placeholder={placeholder}
				value={searchInput}
				onChange={(e) => {
                    e.preventDefault();
					setSearchInput(e.target.value);
                    find = async() => {
                        let newRes = {};
                        let regx = new RegExp(e.target.value);
                        for (const header in allResults) {

                            //header matches
                            if (header.match(regx)) {
                                newRes[header] = allResults[header];
                                continue;
                            }

                            //indiv section matches
                            for (let i = 0; i < allResults[header].length; i++) {
                                if (allResults[header][i][0].match(regx)) {
                                    if (!newRes[header]) {
                                        newRes[header] = [];
                                    }
                                    newRes[header].push(allResults[header][i]);
                                }
                            }
                        }
                        setSearchResults(newRes);
                    }
                    find();
				}}
			/>
		</div>
	);
}
