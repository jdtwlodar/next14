import { cookies } from "next/headers";
import { executeGraphql } from "@/api/gql";
import {
	CartFindOrCreateDocument,
	GetCardByIdDocument,
	CartAddProductDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

export const getCartFromCookies = async () => {
	const cartId = cookies().get("cartId")?.value;
	if (!cartId) {
		return null;
	}
	const cart = await getCartById(cartId);
	return cart;
};

export const getCartById = async (id: string) => {
	const graphqlResponse = await executeGraphql({
		query: GetCardByIdDocument,
		variables: { id: id },
		next: {
			tags: ["cart"],
		},
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
	});
	return graphqlResponse;
};
