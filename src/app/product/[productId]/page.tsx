import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";
import { AddToCartButton } from "./AddToCartButton";
import { getProductById, getProductsList } from "@/api/products";
import { ProductSingleImage } from "@/components/atoms/ProductSingleImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Loader } from "@/components/atoms/Loader";
import { SuggestedProducts } from "@/components/organisms/SuggestedProducts";

import { addProductToCart } from "@/api/cart";
import { getOrCreateCart, changeItemQuantity } from "@/api/actions";
import { RatingForm } from "@/components/organisms/RatingForm";
import { ReviewSingle } from "@/components/molecules/ReviewSingle";

export const generateStaticParams = async () => {
	const products = await getProductsList();
	const slicedProducts = products.slice(0, 10);
	return slicedProducts.map((product) => ({
		productId: product.id,
	}));
};

export const generateMetadata = async ({ params }: { params: { productId: string } }) => {
	const product = await getProductById(params.productId);
	if (!product) return;
	return {
		title: product.name,
		description: product.description,
		siteName: product.name,
		canonical: `https://next14-eight-xi.vercel.app/product/${product.id}`,
		openGraph: {
			title: product.name,
			description: product.description,
		},
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);
	if (!product) return notFound();
	async function addProductToCartAction() {
		"use server";
		const cart = await getOrCreateCart();
		await addProductToCart(cart.id, params.productId);

		// remove when api starts working correctly
		const currentProductQuantity = cart.items.filter(
			(item) => item.product.id === params.productId,
		);
		if (currentProductQuantity[0] && currentProductQuantity[0].quantity)
			await changeItemQuantity(cart.id, params.productId, currentProductQuantity[0].quantity + 1);

		revalidateTag("cart");
	}
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<div className="flex w-full max-w-screen-xl flex-1 flex-col items-center justify-center px-20 text-center">
				<article>
					<h1 className="my-8 py-4 text-6xl font-bold text-pink-600">{product?.name}</h1>
					<div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
						<div>{product.images[0] && <ProductSingleImage {...product.images[0]} />}</div>
						<form action={addProductToCartAction}>
							<ProductListItemDescription product={product} />
							<p className="my-3  pb-4 text-left text-sm">{product.description}</p>
							<AddToCartButton />
						</form>
					</div>
				</article>
				<aside className="mt-16">
					<Suspense fallback={<Loader />}>
						<SuggestedProducts />
					</Suspense>
					<Suspense fallback={<Loader />}>
						<div className="flex flex-col items-start justify-between pt-10 md:flex-row">
							<div className="md:w-1/3">
								<RatingForm product={product} />
							</div>

							<div className="mt-10 flex flex-col md:w-1/2">
								<h4 className="text-2xl">Reviews</h4>
								{product.reviews.slice(-4).map((review) => (
									<ReviewSingle key={review.id} review={review} />
								))}
							</div>
						</div>
					</Suspense>
				</aside>
			</div>
		</div>
	);
}
