import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar(props) {
    const { isOpened } = props;

    return (
                    <div className={`border border-border bg-bg-secondary rounded ${!isOpened && "cursor-pointer transition-colors duration-200 hover:bg-bg-tertiary"}`}>
            <span className="px-3 py-1.5 border-r border-r-border"><FontAwesomeIcon icon={faSearch} className="text-text-footer" /></span>

            {
                isOpened ?
                    (<input
                        input="text"
                        className="px-3 py-1.5 bg-transparent outline-none font-normal text-text-footer"
                        placeholder="Search"
                    />) 
                :
                    (
                        <span className="px-3 py-1.5 text-text-footer inline-block w-[10rem]">Search</span>
                    )
            }
            </div>
    );
}