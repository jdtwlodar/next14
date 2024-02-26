export type ProductItemType = {
	description: string;
	id: string;
	category: string;
	name: string;
	price: number;
	coverImage: {
		src: string;
		alt: string;
	};
	longDescription: string;
};
