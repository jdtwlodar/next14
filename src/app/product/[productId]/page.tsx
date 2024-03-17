import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revalidateTag } from "next/cache";
import { AddToCartButton } from "./AddToCartButton";
import { getProductById, getProductsList } from "@/api/products";
import { ProductSingleImage } from "@/components/atoms/ProductSingleImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Loader } from "@/components/atoms/Loader";
import { SuggestedProducts } from "@/components/organisms/SuggestedProducts";

import { addProductToCart, getOrCreateCart } from "@/api/cart";

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
		revalidateTag("cart");
	}
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<article>
					<h1 className="text-6xl font-bold">{product?.name}</h1>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>{product.images[0] && <ProductSingleImage {...product.images[0]} />}</div>
						<form action={addProductToCartAction}>
							<ProductListItemDescription product={product} />

							<AddToCartButton />
						</form>
					</div>
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
