import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProductsListBySearch } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";
import { Loader } from "@/components/atoms/Loader";

export default async function SearchProductsPage({
	searchParams,
}: {
	searchParams: { query: string };
}) {
	if (!searchParams.query || searchParams.query.length < 2) {
		return notFound();
	}
	const products = await getProductsListBySearch(searchParams.query);
	if (!products || products.data.length === 0) {
		return <div>Nothing found</div>;
	}
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Found {products.data.length} items for phrase <i>{searchParams.query}</i>
				</h2>
				<Suspense fallback={<Loader />}>
					<ProductsList products={products.data.slice(-6)} />
				</Suspense>
			</div>
		</div>
	);
}
