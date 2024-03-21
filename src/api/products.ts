import {
	ProductsGetListDocument,
	ProductGetByIdDocument,
	ProductsGetListWithPaginationDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetListSuggestedByCategoryDocument,
	ProductsGetListBySearchDocument,
	GetProductsCategoriesListDocument,
	type SortDirection,
	type ProductSortBy,
	//type ProductsListItemFragmentFragment,
} from "@/gql/graphql";
import { executeGraphql } from "@/api/gql";
import { PRODUCTS_PER_PAGE } from "@/utils/constants";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	categories: Array<{ name: string }>;
	images: Array<{ url: string; alt: string }>;
};

export const getProductsList = async () => {
	const graphqlResponse = await executeGraphql({
		query: ProductsGetListDocument,
		variables: {},
		next: { revalidate: 550 },
	});
	return graphqlResponse.products.data;
};

export const getProductsForPage = async (
	orderBy?: { orderBy: ProductSortBy; order?: SortDirection },

	count: number = PRODUCTS_PER_PAGE,
) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetListWithPaginationDocument,
		variables: {
			orderBy: orderBy?.orderBy || "DEFAULT",
			order: orderBy?.order || "DESC",
			count,
		},
	});
	return graphQLResponse.products;
};

export const getProductsListBySearch = async (
	search: string,
	count: number = PRODUCTS_PER_PAGE,
) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetListBySearchDocument,
		variables: { search, count },
	});
	return graphQLResponse.products;
};

export const getProdcutsByCategoryBySlug = async (slug: string) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetByCategorySlugDocument,
		variables: {
			slug,
		},
	});
	return graphQLResponse.category;
};
export const getSuggestedProdcutsListByCategory = async (slug: string) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetListSuggestedByCategoryDocument,
		variables: {
			slug,
		},
	});
	return graphQLResponse.category;
};

export const getProductsByCollectionSlug = async (slug: string) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetByCollectionSlugDocument,
		variables: {
			slug,
		},
	});
	return graphQLResponse.collection;
};
export const getProductsCategoryList = async () => {
	const graphQLResponse = await executeGraphql({
		query: GetProductsCategoriesListDocument,
		variables: {},
	});
	return graphQLResponse.categories.data;
};

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id },
	});
	return graphqlResponse.product;
};
