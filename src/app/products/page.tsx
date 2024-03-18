import { Suspense } from "react";
import { getProductsForPage } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";

import { ProductsList } from "@/components/organisms/ProductsList";
import { Loader } from "@/components/atoms/Loader";

export const generateStaticParams = async () => {
	const products = await getProductsForPage(10);
	const slicedProducts = products.data.slice(0, 10);
	return slicedProducts.map((product) => ({
		productId: product.id,
	}));
};

export default async function ProductsPage() {
	const pageNumber = 1;
	const product = await getProductsForPage(20);
	return (
		<div className="bg-white">
			<Suspense fallback={<Loader />}>
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
