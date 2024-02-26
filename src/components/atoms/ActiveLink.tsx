"use client";
import { type UrlObject } from "url";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

export function ActiveLink<T extends string>({
	href,
	children,
	className,
	activeClassName,
	disabled,
	exact = true,
	...props
}: {
	href: UrlObject | Route<T>;
	children: React.ReactNode;
	className: string;
	activeClassName: string;
	exact?: boolean;
	disabled?: boolean;
	props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
	const pathname = usePathname();
	const matchedPathname = (typeof href === "string" ? href : href.pathname) ?? null;
	const isActive = exact ? pathname === matchedPathname : pathname.startsWith(matchedPathname);
	return (
		<Link
			href={href}
			className={clsx(className, isActive && activeClassName, disabled && "pointer-events-none")}
			aria-current={isActive ? "page" : undefined}
			{...props}
		>
			{children}
		</Link>
	);
}
