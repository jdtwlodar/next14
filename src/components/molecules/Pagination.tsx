import { type Route } from "next";
import { ActiveLink } from "@/components/atoms/ActiveLink";

interface PaginationProps {
	currentPage: number;
	totalProducts: number;
	itemsPerPage: number;
	url: string;
}

export const Pagination = ({ currentPage, totalProducts, itemsPerPage, url }: PaginationProps) => {
	const totalPages = Math.ceil(totalProducts / itemsPerPage);

	const renderPageLinks = () => {
		const pageLinks = [];
		for (let i = 1; i <= totalPages; i++) {
			const link = `${url}${i}`;
			pageLinks.push(
				<li key={i}>
					<ActiveLink
						href={link as Route<string>}
						className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
						activeClassName="border-indigo-500 text-indigo-600"
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
		<nav aria-label="pagination" role="navigation" className="mx-auto my-4">
			<ul className="mx-auto flex justify-center space-x-2">
				{currentPage > 1 && (
					<>
						<li>
							<ActiveLink
								className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
								activeClassName="border-indigo-500 text-indigo-600"
								href={`${url}1` as Route<string>}
								exact={true}
							>
								{"|<"}
							</ActiveLink>
						</li>
						<li>
							<ActiveLink
								className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
								activeClassName="border-indigo-500 text-indigo-600"
								href={`${url}${currentPage - 1}` as Route<string>}
								exact={true}
							>
								{"<"}
							</ActiveLink>
						</li>
					</>
				)}
				{renderPageLinks()}
				{currentPage < totalPages && (
					<li>
						<ActiveLink
							className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
							activeClassName="border-indigo-500 text-indigo-600"
							href={`${url}${currentPage + 1}` as Route<string>}
							exact={true}
						>
							{">"}
						</ActiveLink>
					</li>
				)}
				{currentPage < totalPages && (
					<li>
						<ActiveLink
							className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
							activeClassName="border-indigo-500 text-indigo-600"
							href={`${url}${totalPages}` as Route<string>}
							exact={true}
						>
							{">|"}
						</ActiveLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
