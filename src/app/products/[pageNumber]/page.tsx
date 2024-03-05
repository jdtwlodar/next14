import { getProductsForPage } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductsList } from "@/components/organisms/ProductsList";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

export const generateStaticParams = async () => {
	return [{ pageNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
};

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const pageNumber = parseInt(params.pageNumber, 10);
	const product = await getProductsForPage(PRODUCTS_PER_PAGE);
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>
				<ProductsList products={product.data} />
				<Pagination
					url="/products/"
					currentPage={pageNumber}
					itemsPerPage={product.meta.count}
					totalProducts={product.meta.total}
				/>
			</div>
		</div>
	);
}
