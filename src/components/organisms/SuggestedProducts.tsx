import { getProductsList } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const SuggestedProducts = async () => {
	const products = await getProductsList();
	if (!products) {
		throw new Error("No products");
	}
	await sleep(200);
	return <ProductsList products={products.slice(-4)} />;
};
