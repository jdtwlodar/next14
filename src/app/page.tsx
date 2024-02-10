import { ProductsList } from "@/components/organisms/ProductsList";

export default function Home() {
	const products = [
		{
			id: 1,
			name: "Basic Tee",
			category: "clothes",
			coverImage: {
				src: "/images/product_1.jpg",
				alt: "Front of men's Basic Tee in black.",
			},
			price: 3500,
			color: "Black",
		},
		{
			id: 2,
			name: "Denim Jacket",
			category: "clothes",
			coverImage: {
				src: "/images/product_2.png",
				alt: "Front of men's Denim Jacket in indigo.",
			},
			price: 9585,
			color: "Indigo",
		},
		{
			id: 3,
			name: "Leather Sneakers",
			category: "clothes",
			coverImage: {
				src: "/images/product_3.png",
				alt: "Pair of men's Leather Sneakers in white.",
			},
			price: 15410,
			color: "White",
		},
		{
			id: 4,
			name: "Crewneck Sweatshirt",
			category: "clothes",
			coverImage: {
				src: "/images/product_4.png",
				alt: "Front of men's Crewneck Sweatshirt in grey.",
			},
			price: 567450,
			color: "Grey",
		},
		{
			id: 5,
			name: "Skinny Jeans",
			category: "clothes",
			coverImage: {
				src: "/images/product_5.jpg",
				alt: "Front of men's Skinny Jeans in blue.",
			},
			price: 64545675,
			color: "Blue",
		},
	];
	return (
		<main>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>
					<ProductsList products={products} />
				</div>
			</div>
		</main>
	);
}
