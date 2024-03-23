import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

interface PaginationProps {
	currentPage: number;
	totalProducts: number;
	itemsPerPage: number;
	url: string;
	searchParams: Record<string, string>;
}

// add search params to url
export const Pagination = ({
	currentPage,
	totalProducts,
	itemsPerPage,
	url,
	searchParams,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalProducts / itemsPerPage);

	const renderPageLinks = () => {
		const pageLinks = [];
		for (let i = 1; i <= totalPages; i++) {
			const link =
				searchParams && searchParams.orderBy
					? `${url}${i}?orderBy=${searchParams.orderBy}&order=${searchParams.order}`
					: `${url}${i}`;
			pageLinks.push(
				<li key={i}>
					<ActiveLink
						href={link as Route<string>}
						className={`${currentPage === i ? "border-indigo-500 text-pink-600" : ""} inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700`}
						activeClassName="border-indigo-500 text-pink-600"
						exact={true}
					>
						{i}
					</ActiveLink>
				</li>,
			);
		}
		return pageLinks;
	};

	return (
		<nav aria-label="pagination" role="navigation" className="mx-auto my-6">
			<ul className="mx-auto flex justify-center space-x-2">{renderPageLinks()}</ul>
		</nav>
	);
};
