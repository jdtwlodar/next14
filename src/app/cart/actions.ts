"use server";
import { executeGraphql } from "@/api/gql";
import { CartChangeItemQuantityDocument, CartRemoveProductDocument } from "@/gql/graphql";

export const changeItemQuantity = (id: string, productId: string, quantity: number) => {
	return executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: { id, productId, quantity },
	});
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
