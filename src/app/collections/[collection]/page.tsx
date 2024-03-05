import { notFound } from "next/navigation";
import { getProductsByCollectionSlug } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

export default async function CollectionSinglePage({ params }: { params: { collection: string } }) {
	const collection = await getProductsByCollectionSlug(params.collection);
	if (!collection) {
		notFound();
	}
	return (
		<div>
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-8">
					<div className="mx-auto py-8">
						<h1 className="text-bold">{collection.name}</h1>
						<p>{collection.description}</p>
					</div>
				</div>
			</div>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<ProductsList products={collection.products} />
				</div>
			</div>
		</div>
	);
}
