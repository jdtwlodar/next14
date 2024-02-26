import { getProductsList } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

export default async function ProductsPage() {
	const products = await getProductsList();
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>
				<ProductsList products={products} />
			</div>
		</div>
	);
}
