import { useEffect, useState } from "react";
import Link from "next/link";
import Searchbar from "@/components/searchbar/Searchbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function genHeader(regx, size, header) {
    if (header.match(regx)) {
        let begin = header.match(regx).index;
        return (
            <div className="flex">
                <h3 className="text-text-header text-lg font-bold text-left mt-4 whitespace-pre">
                    {header.substr(0, begin)}
                </h3>
                <h3 className="text-transparent text-lg font-bold text-left mt-4 bg-clip-text bg-gradient-to-r from-green-500 to-cyan-200 whitespace-pre">
                    {header.substr(begin, size)}
                </h3>
                <h3 className="text-text-header text-lg font-bold text-left mt-4 whitespace-pre">
                    {header.substr(begin + size, header.length - begin - size)}
                </h3>
            </div>
        );
    }
    return <h3 className="text-text-header text-lg font-bold text-left mt-4">{header}</h3>
}

function genIndiv(regx, size, indiv) {
    if (indiv.match(regx)) {
        let begin = indiv.match(regx).index;
        console.log(begin);
        return (
            <div className="flex">
                <h3 className="transition-colors duration-200 hover:text-text-header whitespace-pre">
                    {indiv.substr(0, begin)}
                </h3>
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-200 whitespace-pre">
                    {indiv.substr(begin, size)}
                </h2>
                <h3 className="transition-colors duration-200 hover:text-text-header whitespace-pre">
                    {indiv.substr(begin + size, indiv.length - begin - size)}
                </h3>
            </div>
        );
    }
    return <h3 className="transition-colors duration-200 hover:text-text-header whitespace-pre">{indiv}</h3>
}

export default function SearchModal(props) {
	let { modalState, setModalState, sections, setSections } = props;

	const [search, setSearch] = useState("");
    const [allResults, setAllResults] = useState(false);
	const [searchResults, setSearchResults] = useState(false);

	useEffect(() => {}, [search]);
	useEffect(() => {
		fetch("/data/docs.json")
			.then((res) => res.json())
			.then((text) => {
                setAllResults(text);
                setSearchResults(text)
            });
	}, []);

	function closeModal() {
		setModalState((prev) => !prev);
	}

	return (
        <>
            {modalState && <div className="z-[50] fixed left-0 right-0 bottom-0 top-0 bg-transparent" onClick={closeModal}/>}
            <dialog
                open={modalState ? true : false}
                className="z-[60] overscroll-contain fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 bg-bg-secondary px-6 py-4 border border-border rounded"
            >
                <div className="relative pt-8">
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="text-xl absolute top-0 right-0 cursor-pointer text-text-dangerous"
                        onClick={(e) => {
                            closeModal();
                        }}
                    />

                    <Searchbar placeholder="Search" fullWidth={true} searchInput={search} setSearchInput={setSearch} allResults={allResults} setSearchResults={setSearchResults} />

                    <div className="overflow-y-scroll max-h-[55vh] text-center rounded text-text-body mt-2 mb-4 border border-border px-6 pb-6 bg-bg-tertiary">
                        {searchResults && Object.keys(searchResults).length ? (
                            Object.keys(searchResults).map((curHeader, curHeaderIdx) => {
                                return (
                                    <div key={curHeaderIdx}>

                                        {/*highlighting header*/}
                                        {genHeader(new RegExp(search, "i"), search.length, curHeader)}

                                        <div className="flex flex-col justify-center items-start">
                                            {searchResults[curHeader].map((indiv, indivIdx) => {
                                                const adjResIdx = curHeaderIdx + indivIdx;
                                                const title = indiv[0];
                                                const link = indiv[1];

                                                return (
                                                    <Link
                                                        key={adjResIdx}
                                                        href={"/docs" + link}
                                                        onClick={(e) => {
                                                            let sectionCpy = {
                                                                ...sections,
                                                            };

                                                            for (const header in sections) {
                                                                for (let i = 0; i < sections[header].length; i++) {
                                                                    sectionCpy[header][i][2] = false;
                                                                }
                                                            }

                                                            sectionCpy[curHeader][indivIdx][2] = true;

                                                            setSections(sectionCpy);
                                                            closeModal();
                                                        }}
                                                        className="border border-border px-4 py-2 rounded flex flex-row justify-between items-center w-full mt-4 hover:bg-bg-primary"
                                                    >
                                                        {/*highlighting title*/}
                                                        {genIndiv(new RegExp(search, "i"), search.length, title)}

                                                        <FontAwesomeIcon icon={faArrowRight} className="text-green-400 " />
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* {curHeaderIdx < Object.keys(searchResults).length - 1 && ( */}
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
        </>
        
	);
}
