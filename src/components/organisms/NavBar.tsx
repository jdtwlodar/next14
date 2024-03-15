import { type Route } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SearchBar } from "@/components/molecules/SearchBar";

import { Icon } from "@/components/atoms/Icon";
import { getCartFromCookies } from "@/api/cart";

export const NavBar = async () => {
	const navLinks = [
		{ path: "/", title: "Home", exact: true },
		{ path: "/products", title: "All", exact: false },
		{ path: "/categories/t-shirts", title: "T-Shirts", exact: false },
		{ path: "/categories/hoodies", title: "Hoodies", exact: false },
		{ path: "/categories/accessories", title: "Accessories", exact: false },
	];
	const cart = await getCartFromCookies();

	const countCartItems = cart?.items.length || 0;
	return (
		<nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
			<ul className="flex gap-x-2 text-white">
				{navLinks.map((link) => (
					<li key={link.path}>
						<ActiveLink
							href={link.path as Route<string>} // Fix: Update the type of href to be of type Route<string>
							className={
								"cursor-pointer border-b border-transparent hover:border-blue-200 hover:text-blue-700"
							}
							activeClassName={"text-blue-200 border-blue-200"}
							exact={link.exact}
						>
							{link.title}
						</ActiveLink>
					</li>
				))}
			</ul>

			<div className="flex items-center space-x-4">
				<Suspense>
					<SearchBar />
				</Suspense>
				<div className="text-blue-500">
					<Link href="/cart">
						<Icon name="shopping-cart" />
						{cart && <sup>{countCartItems}</sup>}
					</Link>
				</div>
			</div>
		</nav>
	);
};
