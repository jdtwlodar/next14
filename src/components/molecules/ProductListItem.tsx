import Link from "next/link";
import { ProductCoverImage } from "@/components/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductItemType } from "@/components/types";

type ProductListItemProps = {
	product: ProductItemType;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	return (
		<li className="group relative">
			<Link href={`/product/${product.id}`} key={product.id}>
				<div>
					<ProductCoverImage {...product.coverImage} />
					<ProductListItemDescription product={product} />
				</div>
			</Link>
		</li>
	);
};
