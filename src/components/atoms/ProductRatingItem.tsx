import { Star } from "lucide-react";
import { type ProductsListItemFragmentFragment } from "@/gql/graphql";

type ProductListItemDescriptionProps = {
	product: ProductsListItemFragmentFragment;
};

export const ProductRatingItem = ({ product: { rating } }: ProductListItemDescriptionProps) => {
	const ratingCounter = rating || 0;
	const ratingParseToInt = ~~ratingCounter;

	const generateStarRating = (itemrating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<Star
					key={i}
					className={`${i <= itemrating ? "fill-current text-green-600" : "fill-current text-green-100"}`}
				/>,
			);
		}
		return stars;
	};

	return (
		<div>
			{rating && (
				<div className="flex justify-between">
					<div data-testid="product-rating">{ratingParseToInt} / 5</div>
					<div className="flex justify-between">{generateStarRating(ratingParseToInt)}</div>
				</div>
			)}
		</div>
	);
};
