"use client";
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
	href: Route<T>;
	children: React.ReactNode;
	className: string;
	activeClassName: string;
	exact?: boolean;
	disabled?: boolean;
	props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
	const pathname = usePathname();
	const isActive = exact ? pathname === href : pathname.startsWith(href);
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
