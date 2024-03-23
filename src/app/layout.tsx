import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "@/app/assets/css/globals.css";
import { NavBar } from "@/components/organisms/NavBar";

const font_class = Roboto_Mono({ subsets: ["latin", "latin-ext"] });

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
			<body className={`${font_class.className} min-h-screen bg-blue-950 pt-[90px] text-white`}>
				<NavBar />
				<main className="min-h-[94vh] pb-6">{children}</main>
				<footer>
					<div className="bg-pink-600 p-4 text-white"> R copyrights </div>
				</footer>
			</body>
		</html>
	);
}
