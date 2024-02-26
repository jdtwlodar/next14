import { getProductsForPage, getTotalProductsCount } from "@/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductsList } from "@/components/organisms/ProductsList";

export const generateStaticParams = async () => {
	return [{ pageNumber: "1" }, { pageNumber: "2" }, { pageNumber: "3" }];
};

export default async function ProductsPage({ params }: { params: { pageNumber: string } }) {
	const pageNumber = parseInt(params.pageNumber, 10);
	const products = await getProductsForPage(pageNumber);
	const productsTotal = await getTotalProductsCount();
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>
				<ProductsList products={products} />
				<Pagination currentPage={pageNumber} itemsPerPage={5} totalProducts={productsTotal} />
			</div>
		</div>
	);
}
