import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Corrosion Documentation",
	description: "Documentation and usage for the Corrosion Language"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Navbar />

				{children}
			</body>
		</html>
	);
}
