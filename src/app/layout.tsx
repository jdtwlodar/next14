import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ActiveLink } from "@/components/atoms/ActiveLink";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>
				<nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
					<ul className="flex gap-x-2 text-white">
						<li>
							<ActiveLink
								href="/"
								className={"cursor-pointer  hover:text-blue-700"}
								activeClassName={"text-blue-200"}
							>
								Home
							</ActiveLink>
						</li>
						<li>
							<ActiveLink
								exact={false}
								className={"cursor-pointer hover:text-blue-700"}
								activeClassName={"text-blue-200"}
								href="/products"
							>
								All
							</ActiveLink>
						</li>
					</ul>
				</nav>
				<main>{children}</main>
				<footer>
					<div className="bg-gray-800 p-4 text-white"> R copyrights </div>
				</footer>
			</body>
		</html>
	);
}
