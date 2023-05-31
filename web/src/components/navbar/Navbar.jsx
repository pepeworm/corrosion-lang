import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
    return (
        <nav className="px-8 py-4 flex flex-row justify-between items-center border-b">
            {/* Logo section */}

            <div>
                <Link href="/">
                    {/* <Image src="" /> */}

                    {/* Change for an image or custom font later */}
                    <span>Corrosion</span>
                </Link>
            </div>

            <div className="">
                <ul className="flex flex-row justify-center items-center gap-8">
                    <li>
                        <Link href="/showcase">Showcase</Link>
                    </li>
                    <li>
                        <Link href="/docs">Docs</Link>
                    </li>
                    <li className="mb-[-0.25rem]">
                        <Link
                            href="https://github.com/pepeworm/corrosion-lang"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FontAwesomeIcon
                                icon={faGithub}
                                className="text-2xl"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}