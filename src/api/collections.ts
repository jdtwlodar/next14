import { executeGraphql } from "@/api/gql";
import { CollectionsGetListDocument } from "@/gql/graphql";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

export const getCollectionsList = async (count: number = PRODUCTS_PER_PAGE) => {
	const graphqlResponse = await executeGraphql(CollectionsGetListDocument, { count });
	return graphqlResponse.collections.data;
};
