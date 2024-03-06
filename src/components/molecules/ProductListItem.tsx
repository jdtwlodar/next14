import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCoverImage } from "@/components/atoms/ProductListCoverImage";
import { ProductListItemDescription } from "@/components/atoms/ProductListItemDescription";
import { type ProductsListItemFragmentFragment } from "@/gql/graphql";

type ProductListItemProps = {
	product: ProductsListItemFragmentFragment;
};

export const ProductListItem = ({ product }: ProductListItemProps) => {
	if (!product) {
		notFound();
	}

	return (
		<li className="group relative">
			<Link href={`/product/${product.id}`} key={product.id}>
				<div>
					{product.images[0] && <ProductCoverImage {...product.images[0]} />}
					<ProductListItemDescription product={product} />
				</div>
			</Link>
		</li>
	);
};
