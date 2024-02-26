import { Suspense } from "react";
import { getProductById } from "@/api/products";
import { ProductCoverImage } from "@/components/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { SuggestedProducts } from "@/components/organisms/SuggestedProducts";
import { Loader } from "@/components/atoms/Loader";

/* export const generateStaticParams = async () => {
	const products = await getProductsList();
	return products.map((product) => ({
		productId: product.id,
	}));
}; */

export const generateMetadata = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);
	return {
		title: product.name,
		description: product.description,
		siteName: product.name,
		canonical: `https://next14-eight-xi.vercel.app/product/${product.id}`,
		openGraph: {
			title: product.name,
			description: product.description,
			images: [product.coverImage.src],
		},
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<article>
					<h1 className="text-6xl font-bold">{product?.name}</h1>
					<div>{product.description}</div>
					<ProductCoverImage {...product.coverImage} />
					<ProductListItemDescription product={product} />

					<div>{product.longDescription}</div>
				</article>
				<aside>
					<Suspense fallback={<Loader />}>
						<SuggestedProducts />
					</Suspense>
				</aside>
			</div>
		</div>
	);
}
