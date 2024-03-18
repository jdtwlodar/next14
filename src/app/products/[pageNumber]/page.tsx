import { getProductsForPage } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductsList } from "@/components/organisms/ProductsList";

export const generateStaticParams = async () => {
	return [{ pageNumber: "1" }, { pageNumber: "2" }];
};

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const pageNumber = parseInt(params.pageNumber, 10);
	const product = await getProductsForPage(20);
	return (
		<div className="bg-white">
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
