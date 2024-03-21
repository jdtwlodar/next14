import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/app/assets/css/globals.css";
import { NavBar } from "@/components/organisms/NavBar";

const open_sans = Open_Sans({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
	title: "Super shop",
	description: "Super shop with super products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={open_sans.className}>
				<NavBar />
				<main>{children}</main>
				<footer>
					<div className="bg-gray-800 p-4 text-white"> R copyrights </div>
				</footer>
			</body>
		</html>
	);
}
