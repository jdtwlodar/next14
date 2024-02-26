"use client";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export const ActiveLink = ({
	href,
	children,
	className,
	activeClassName,
	exact = true,
	...props
}: {
	href: Route | URL;
	children: React.ReactNode;
	className: string;
	activeClassName: string;
	exact?: boolean;
	props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) => {
	const pathname = usePathname();
	const matchedPathname = (typeof href === "string" ? href : href.pathname) ?? null;
	const isActive = exact ? pathname === matchedPathname : pathname.startsWith(matchedPathname);

	return (
		<Link
			href={href}
			className={clsx(className, isActive && activeClassName)}
			aria-current={isActive ? "page" : undefined}
			{...props}
		>
			{children}
		</Link>
	);
};
