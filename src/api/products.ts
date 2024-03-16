import {
	ProductsGetListDocument,
	ProductGetByIdDocument,
	ProductsGetListWithPaginationDocument,
	ProductsGetByCategorySlugDocument,
	ProductsGetByCollectionSlugDocument,
	ProductsGetListSuggestedByCategoryDocument,
	ProductsGetListBySearchDocument,
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

export const getProductsForPage = async (count: number = PRODUCTS_PER_PAGE) => {
	const graphQLResponse = await executeGraphql({
		query: ProductsGetListWithPaginationDocument,
		variables: { count },
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

/* export const PRODUCTS_PER_PAGE = 20;
export const getProductsForPage = async (page: number) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PRODUCTS_PER_PAGE}&offset=${PRODUCTS_PER_PAGE * (page - 1)}`,
	);
	const productsResponse = (await res.json()) as ProductResponseItem[];
	const products = productsResponse.map((product) => productResponseItemToProductItemType(product));
	return products;
}; */
/* export const getTotalProductsCount = async (count = 0): Promise<number> => {
	const PER_FETCH = 100;

	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PER_FETCH}&offset=${count}`,
	);
	const data = (await res.json()) as ProductResponseItem[];

	const newCount = count + data.length;

	return newCount;
}; */

/* export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);

	const productResponse = (await res.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
}; */
export const getProductById = async (id: ProductResponseItem["id"]) => {
	const graphqlResponse = await executeGraphql({
		query: ProductGetByIdDocument,
		variables: { id },
	});
	return graphqlResponse.product;
};
