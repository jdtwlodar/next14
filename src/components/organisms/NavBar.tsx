import { type Route } from "next";
import { Suspense } from "react";
import { ShoppingBag } from "lucide-react";
import { ActiveLink } from "@/components/atoms/ActiveLink";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Loader } from "@/components/atoms/Loader";
import { getCartFromCookies } from "@/api/actions";

export const NavBar = async () => {
	const navLinks = [
		{ path: "/", title: "Home", exact: true },
		{ path: "/products", title: "All", exact: false },
		{ path: "/categories/t-shirts", title: "T-Shirts", exact: false },
		{ path: "/categories/hoodies", title: "Hoodies", exact: false },
		{ path: "/categories/accessories", title: "Accessories", exact: false },
	];
	const cart = await getCartFromCookies();

	//const countCartItems = cart?.items.length || 0;
	const allItemsQuantity = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
	return (
		<div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-b-blue-500 bg-blue-950 p-4 text-white">
			<nav className="flex items-center justify-between p-4 text-white">
				<ul className="flex gap-x-2 text-white">
					{navLinks.map((link) => (
						<li key={link.path}>
							<ActiveLink
								href={link.path as Route<string>} // Fix: Update the type of href to be of type Route<string>
								className={
									"mx-2 cursor-pointer rounded-md border-b border-transparent px-3 py-2 text-white hover:border-blue-800 hover:bg-gradient-to-t hover:from-blue-800 hover:to-pink-600 hover:text-white hover:opacity-80"
								}
								activeClassName={
									"text-blue-200 border-blue-800 bg-gradient-to-t from-blue-800 to-pink-600"
								}
								exact={link.exact}
							>
								{link.title}
							</ActiveLink>
						</li>
					))}
				</ul>
			</nav>
			<div className="flex items-center space-x-4">
				<Suspense fallback={<Loader />}>
					<SearchBar />
				</Suspense>
				<div className="text-white">
					<ActiveLink
						href="/cart"
						className={" ml-3 flex cursor-pointer px-2  hover:text-pink-600"}
						activeClassName={"text-pink-600 "}
					>
						<ShoppingBag size={24} />
						<span>{cart && <sup>{allItemsQuantity}</sup>}</span>
					</ActiveLink>
				</div>
			</div>
		</div>
	);
};
