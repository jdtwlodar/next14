import { ProductCoverImage } from "@/components/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/components/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li className="group relative">
			<ProductCoverImage {...product.coverImage} />
			<ProductListItemDescription product={product} />
		</li>
	);
};
