import { Star } from "lucide-react";

export const ProductRatingItem = ({ rating }: { rating: number }) => {
	const ratingCounter = rating || 0;
	const ratingParseToInt = ~~ratingCounter;

	const generateStarRating = (itemrating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<Star
					key={i}
					className={`${i <= itemrating ? "fill-current text-green-700" : "fill-current text-green-100"}`}
				/>,
			);
		}
		return stars;
	};

	return (
		<div>
			{rating && (
				<div className="flex justify-between">
					<div data-testid="product-rating" className="mr-2">
						{ratingParseToInt} / 5
					</div>
					<div className="flex justify-between">{generateStarRating(ratingParseToInt)}</div>
				</div>
			)}
		</div>
	);
};
