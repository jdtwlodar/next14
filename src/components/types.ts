export type ProductItemType = {
	description: string;
	id: string;
	category: string;
	name: string;
	price: number;
	images: Array<{ url: string; alt: string }>;
};
