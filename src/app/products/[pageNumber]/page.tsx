import { getProductsForPage } from "@/api/products";
import { ProductListSortSelect } from "@/components/atoms/ProductListSortSelect";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductsList } from "@/components/organisms/ProductsList";
import { type SortDirection, type ProductSortBy } from "@/gql/graphql";

export const generateStaticParams = async () => {
	return [{ pageNumber: "1" }, { pageNumber: "2" }];
};

export default async function ProductsPage({
	params,
	searchParams,
}: {
	params: { pageNumber: string };
	searchParams: { orderBy: ProductSortBy; order: string; sort: string };
}) {
	const pageNumber = parseInt(params.pageNumber, 10);
	// const product = await getProductsForPage(20);
	const product = await getProductsForPage(
		searchParams?.orderBy
			? {
					orderBy: searchParams.orderBy.toUpperCase() as ProductSortBy,
					order: searchParams.order as SortDirection,
				}
			: { orderBy: "DEFAULT", order: "DESC" },
		20,
	);
	return (
		<div className="bg-white">
			<ProductListSortSelect sort={`${searchParams.orderBy} ${searchParams.order}`} />
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900">our products</h1>
				<ProductsList
					products={product.data.slice(
						4 * parseInt(params.pageNumber, 10) - 4,
						4 * parseInt(params.pageNumber, 10),
					)}
				/>
				<Pagination
					url={`/products/`}
					currentPage={pageNumber}
					itemsPerPage={4}
					totalProducts={product.data.length}
				/>
			</div>
		</div>
	);
}
