import { executeGraphql } from "@/api/gql";
import {
	CartFindOrCreateDocument,
	GetCardByIdDocument,
	CartAddProductDocument,
	CartRemoveProductDocument,
} from "@/gql/graphql";

export const getCartById = async (id: string) => {
	const graphqlResponse = await executeGraphql(GetCardByIdDocument, { id });
	return graphqlResponse.cart;
};
export const createCart = async () => {
	const graphqlResponse = await executeGraphql(CartFindOrCreateDocument, {});
	return graphqlResponse.cartFindOrCreate;
};

export const addProductToCart = async (id: string, productId: string) => {
	const graphqlResponse = await executeGraphql(CartAddProductDocument, {
		id,
		productId,
	});
	return graphqlResponse;
};
export const removeItem = async (id: string, productId: string) => {
	const graphqlResponse = await executeGraphql(CartRemoveProductDocument, {
		id,
		productId,
	});
	return graphqlResponse;
};
