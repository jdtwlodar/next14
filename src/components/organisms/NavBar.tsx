import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

export const NavBar = () => {
	const navLinks = [
		{ path: "/", title: "Home", exact: true },
		{ path: "/products/1", title: "All", exact: false },
		{ path: "/categories/t-shirts/1", title: "T-Shirts", exact: false },
		{ path: "/categories/hoodies/1", title: "Hoodies", exact: false },
		{ path: "/categories/accessories/1", title: "Accessories", exact: false },
	];

	return (
		<nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
			<ul className="flex gap-x-2 text-white">
				{navLinks.map((link) => (
					<li key={link.path}>
						<ActiveLink
							href={link.path as Route<string>} // Fix: Update the type of href to be of type Route<string>
							className={"cursor-pointer hover:text-blue-700"}
							activeClassName={"text-blue-200"}
							exact={link.exact}
						>
							{link.title}
						</ActiveLink>
					</li>
				))}
			</ul>

			<div className="flex items-center space-x-4">
				<ActiveLink href="/cart" className="" activeClassName="text-blue-500">
					Cart
				</ActiveLink>
			</div>
		</nav>
	);
};
