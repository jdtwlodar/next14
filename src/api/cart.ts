import { executeGraphql } from "@/api/gql";
import { CartFindOrCreateDocument, GetCardByIdDocument } from "@/gql/graphql";

export const getCartById = async (id: string) => {
	const graphqlResponse = await executeGraphql(GetCardByIdDocument, { id });
	return graphqlResponse.order;
};
export const createCart = async () => {
	const graphqlResponse = await executeGraphql(CartFindOrCreateDocument, {});
	return graphqlResponse.createOrder;
};
