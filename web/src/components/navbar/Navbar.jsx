"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
    const [github, setGithub] = useState(false);
	return (
        <>
            <nav className="px-12 py-2 flex flex-row justify-between border-b items-center border-border text-text-header">
                <div>
                    <Link href="/" className="flex flex-row justify-center items-center gap-[0.1rem]">
                        <Image
                            src="/images/logo.png"
                            width="35"
                            height="35"
                        />

                        <span className="font-bold text-xl">ORROSION</span>
                    </Link>
                </div>

                <div className="">
                    <ul className="flex flex-row justify-center items-center gap-8">
                        <li>
                            <Link
                                href="/showcase"
                                className="link animate-underline"
                            >
                                Showcase

                                <span className="text-underline"></span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/docs/installation"
                                className="link animate-underline"
                            >
                                Docs

                                <span className="text-underline"></span>
                            </Link>
                        </li>
                        <li className="mb-[-0.25rem]">
                            <button
                                onClick={() => {setGithub(!github);}}
                            >
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className="text-2xl fade"
                                />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            {github && 
                <div
                    className="flex flex-row-reverse relative right-0 left-0"
                >
                    <Link 
                        className="link animate-github"
                        href="https://github.com/pepeworm/corrosion-lang"
                        target="_blank"
                        rel="noreferrer">
                        Documentation
                        <span className="text-underline"></span>
                    </Link>
                    <Link 
                        className="link animate-github"
                        href="https://github.com/sireButItsUnique/erosion-compiler"
                        target="_blank"
                        rel="noreferrer">
                        Compiler
                        <span className="text-underline"></span>
                    </Link>
                    <Link 
                        className="link animate-github"
                        href="https://github.com/corrosion-language/sedimentation-assembler"
                        target="_blank"
                        rel="noreferrer">
                        Assembler
                        <span className="text-underline"></span>
                    </Link>
                </div> 
            }
        </>
        
		
	);
}