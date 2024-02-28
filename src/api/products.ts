import { type ProductItemType } from "@/components/types";

type ProductResponseItem = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	image: string;
	longDescription: string;
};

export const getProductsList = async () => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=20`);
	const productsResponse = (await res.json()) as ProductResponseItem[];
	const products = productsResponse.map((product) => productResponseItemToProductItemType(product));
	return products;
};

export const PRODUCTS_PER_PAGE = 20;
export const getProductsForPage = async (page: number) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PRODUCTS_PER_PAGE}&offset=${PRODUCTS_PER_PAGE * (page - 1)}`,
	);
	const productsResponse = (await res.json()) as ProductResponseItem[];
	const products = productsResponse.map((product) => productResponseItemToProductItemType(product));
	return products;
};

export const getTotalProductsCount = async (count = 0): Promise<number> => {
	const PER_FETCH = 100;

	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=${PER_FETCH}&offset=${count}`,
	);
	const data = (await res.json()) as ProductResponseItem[];

	const newCount = count + data.length;

	return newCount;
};

export const getProductById = async (id: ProductResponseItem["id"]) => {
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${id}`);
	const productResponse = (await res.json()) as ProductResponseItem;
	return productResponseItemToProductItemType(productResponse);
};

const productResponseItemToProductItemType = (product: ProductResponseItem): ProductItemType => {
	return {
		id: product.id,
		name: product.title,
		price: product.price,
		category: product.category,
		description: product.description,
		coverImage: {
			alt: product.title,
			src: product.image,
		},
		longDescription: product.longDescription,
	};
};
