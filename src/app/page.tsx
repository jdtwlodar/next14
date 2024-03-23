import { CollectionBox } from "@/components/molecules/CollectionBox";
import { getProductsList } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

export default async function HomePage() {
	const products = await getProductsList();
	return (
		<div className="flex  flex-col items-center justify-center py-2">
			<div className="flex w-full flex-1 flex-col items-center justify-center px-20 pb-10 text-center">
				<h1 className="mb-10 mt-16 bg-gradient-to-r from-white to-pink-600  bg-clip-text text-6xl font-bold text-transparent">
					Welcome to our store
				</h1>

				<div className="w-full py-12 lg:px-10 xl:px-24 ">
					<CollectionBox />
				</div>
				{products && <ProductsList products={products.slice(-4)} />}
			</div>
		</div>
	);
}
