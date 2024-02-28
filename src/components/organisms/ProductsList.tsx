import { ProductListItem } from "@/components/molecules/ProductListItem";
import { type ProductItemType } from "@/components/types";

type ProductListType = {
	products: ProductItemType[];
};
export const ProductsList = ({ products }: ProductListType) => {
	return (
		<ul
			data-testid="products-list"
			className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
		>
			{products.map((product) => (
			
					<ProductListItem key={product.id} product={product} />
			
			))}
		</ul>
	);
};
