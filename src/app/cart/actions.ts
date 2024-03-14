"use server";
import { executeGraphql } from "@/api/gql";
import { CartChangeItemQuantityDocument } from "@/gql/graphql";

export const changeItemQuantity = (id: string, productId: string, quantity: number) => {
	return executeGraphql(CartChangeItemQuantityDocument, { id, productId, quantity });
};
