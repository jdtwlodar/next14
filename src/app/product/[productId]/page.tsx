import { notFound } from "next/navigation";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { AddToCartButton } from "./AddToCartButton";
import { getProductById, getProductsList } from "@/api/products";
import { ProductSingleImage } from "@/components/atoms/ProductSingleImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { Loader } from "@/components/atoms/Loader";
import { SuggestedProducts } from "@/components/organisms/SuggestedProducts";
import { executeGraphql } from "@/api/gql";
import {
	CartFindOrCreateDocument,
	type CartOrderFragmentFragment,
	GetCardByIdDocument,
} from "@/gql/graphql";
import { addProductToCart } from "@/api/cart";

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
			images: [product.images[0]],
		},
	};
};

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const product = await getProductById(params.productId);
	if (!product) return notFound();
	async function addProductToCartAction() {
		"use server";

		const cart = await getOrCreateCart();
		cookies().set("cartId", cart.id, { path: "/" });
		await addProductToCart(cart.id, params.productId);
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
							<input type="text" name="productId" value={product.id} hidden />
							<input type="number" name="quantity" value="1" />
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
async function getOrCreateCart(): Promise<CartOrderFragmentFragment> {
	const cartId = cookies().get("cartId")?.value;
	if (cartId) {
		const cart = await executeGraphql(GetCardByIdDocument, { id: cartId });
		if (cart && cart.cart) {
			return cart.cart;
		}
	} else {
		await createCart();
	}
	const cart = await createCart();
	if (!cart.id) {
		throw new Error("Could not create cart");
	}
	return cart;
}

async function createCart() {
	const graphqlResponse = await executeGraphql(CartFindOrCreateDocument, {});
	return graphqlResponse.cartFindOrCreate;
}
