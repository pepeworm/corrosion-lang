import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navbar() {
	return (
		<nav className="px-8 py-2 flex flex-row justify-between items-center border-b border-border text-text-header">
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
							href="/docs"
							className="link animate-underline"
						>
							Docs

							<span className="text-underline"></span>
						</Link>
					</li>
					<li className="mb-[-0.25rem]">
						<Link
							href="https://github.com/pepeworm/corrosion-lang"
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faGithub}
								className="text-2xl fade"
							/>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}