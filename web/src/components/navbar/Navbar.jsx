import Image from "next/image";    
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b">
            {/* Logo section */}
            
            <div>
                <Link href="/"></Link>
            </div>

            <div>
                <ul>
                    <li>
                        <Link href="/showcase">Showcase</Link>
                    </li>
                    <li>
                        <Link href="/docs">Docs</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}