"use server";
import { cookies } from "next/headers";
import { executeGraphql } from "@/api/gql";
import {
	CartFindOrCreateDocument,
	GetCardByIdDocument,
	CartAddProductDocument,
	CartRemoveProductDocument,
	type CartOrderFragmentFragment,
} from "@/gql/graphql";

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return null;
	}
	const cart = await getCartById(cartId);
	return cart;
};

export async function getOrCreateCart(): Promise<CartOrderFragmentFragment> {
	const cartCookies = await getCartFromCookies();
	if (cartCookies) {
		return cartCookies;
	} else {
		const cart = await createCart();
		if (!cart.id) {
			throw new Error("Could not create cart");
		}
		cookies().set("cartId", cart.id, {
			expires: new Date(Date.now() * 1000 * 60 * 24 * 7),
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
		});
		return cart;
	}
}

export const getCartById = async (id: string) => {
	const graphqlResponse = await executeGraphql({
		query: GetCardByIdDocument,
		variables: { id: id },
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});
	return graphqlResponse.cart;
};
export const createCart = async () => {
	const graphqlResponse = await executeGraphql({ query: CartFindOrCreateDocument, variables: {} });
	return graphqlResponse.cartFindOrCreate;
};

export const addProductToCart = async (id: string, productId: string) => {
	const graphqlResponse = await executeGraphql({
		query: CartAddProductDocument,
		variables: {
			id,
			productId,
		},
		next: {
			tags: ["cart"],
		},
		cache: "no-store",
	});
	return graphqlResponse;
};
export const removeItem = async (id: string, productId: string) => {
	const graphqlResponse = await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			id,
			productId,
		},
		next: {
			tags: ["cart"],
		},
	});
	return graphqlResponse;
};
