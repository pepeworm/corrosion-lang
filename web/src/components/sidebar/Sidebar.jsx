import Link from "next/link";
import Searchbar from "@/components/searchbar/Searchbar.jsx";

export default function Sidebar(props) {
    const { sections, setSections } = props;

    return (
        <nav className="px-8 py-6 overflow-y-scroll absolute h-[calc(100vh-55.375px)] left-0 top-0 bottom-0 border-r border-border text-text-header">
            <div className="mb-6">
                <Searchbar isOpened={false} />
            </div>
            

            {
                Object.keys(sections).map((key, sectionIdx) => {
                    const title = key;
                    const titleLinks = sections[key];

                    return (
                        <div key={sectionIdx} className={`${(sectionIdx != sections.length - 1) ? "mb-6" : ""}`}>
                            <h3 className="font-bold mb-1.5">{title}</h3>

                            <ul className="border-l border-border">
                                {
                                    titleLinks.map((link, linkIdx) => {
                                        const adjLinkIdx = link[0] + link[1] + sectionIdx + linkIdx;
                                        const linkTitle = link[0];
                                        const linkHref = link[1];
                                        const active = link[2];

                                        return (
                                            <li
                                                key={adjLinkIdx}
                                                className={`${(linkIdx % 2) && linkIdx < titleLinks.length - 1 ? "my-1.5" : ""}`}
                                            >
                                                <Link
                                                    href={linkHref}
                                                    className={`${active ? "link border-l-2 border-text-highlight" : "text-text-footer"} pl-2.5`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        let sectionCpy = {...sections};
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
                                    })
                                }
                            </ul>
                        </div>
                    );
                })
            }
        </nav>
    );
}