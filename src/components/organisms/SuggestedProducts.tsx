import { getProductsList } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const SuggestedProducts = async () => {
	const products = await getProductsList();
	if (!products) {
		throw new Error("No products");
	}
	await sleep(200);
	return (
		<div>
			<h3>You can also like</h3>
			<div data-testid="related-products">
				<ProductsList products={products.slice(-4)} />
			</div>
		</div>
	);
};
