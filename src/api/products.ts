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
