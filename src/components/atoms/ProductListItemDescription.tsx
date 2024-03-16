import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";

type ProductListItemDescriptionProps = {
	product: ProductsListItemFragmentFragment;
};

export const ProductListItemDescription = ({
	product: { name, price },
}: ProductListItemDescriptionProps) => {
	return (
		<div className="mt-4 flex justify-between">
			<div>
				<h3 className="text-sm text-gray-700">{name}</h3>
				<p className="mt-1 text-sm text-gray-500"></p>
			</div>
			<p data-testid="product-price" className="text-sm font-medium text-gray-900">
				{formatMoney(price / 100)}
			</p>
		</div>
	);
};
