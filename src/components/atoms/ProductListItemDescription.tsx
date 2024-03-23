import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";

type ProductListItemDescriptionProps = {
	product: ProductsListItemFragmentFragment;
};

export const ProductListItemDescription = ({
	product: { name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="flex justify-between">
			<div>
				<h3 className="text-sm">{name}</h3>
			</div>
			<p data-testid="product-price" className="text-sm font-medium text-pink-600">
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
