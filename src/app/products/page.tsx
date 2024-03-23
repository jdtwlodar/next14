import { Suspense } from "react";
import { getProductsForPage } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";

import { ProductsList } from "@/components/organisms/ProductsList";
import { Loader } from "@/components/atoms/Loader";
import { ProductListSortSelect } from "@/components/atoms/ProductListSortSelect";
import { type SortDirection, type ProductSortBy } from "@/gql/graphql";

export const generateStaticParams = async () => {
	const products = await getProductsForPage({ orderBy: "PRICE" }, 10);
	const slicedProducts = products.data.slice(0, 10);
	return slicedProducts.map((product) => ({
		productId: product.id,
	}));
};

export default async function ProductsPage({
	searchParams,
}: {
	searchParams: {
		orderBy: ProductSortBy;
		order: string;
	};
}) {
	const pageNumber = 1;
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
		<div className="">
			<Suspense fallback={<Loader />}>
				<ProductListSortSelect sort={`${searchParams.orderBy} ${searchParams.order}`} />
				<div className="  mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">our products</h1>
					<ProductsList products={product.data.slice(0, 4)} />

					<Pagination
						url={`/products/`}
						currentPage={pageNumber}
						itemsPerPage={4}
						totalProducts={product.data.length}
					/>
				</div>
			</Suspense>
		</div>
	);
}
