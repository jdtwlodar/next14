import { CollectionBox } from "@/components/molecules/CollectionBox";
import { getProductsList } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

export default async function HomePage() {
	const products = await getProductsList();
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<h1 className="text-6xl font-bold">Welcome to our store</h1>
				<CollectionBox />
				{products && <ProductsList products={products.slice(-4)} />}
			</div>
		</div>
	);
}
