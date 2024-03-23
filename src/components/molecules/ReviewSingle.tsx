import { ProductRatingItem } from "@/components/atoms/ProductRatingItem";
import { type ProductSingleReviewFragmentFragment } from "@/gql/graphql";

export async function ReviewSingle({ review }: { review: ProductSingleReviewFragmentFragment }) {
	if (!review) {
		return <div>No reviews</div>;
	}
	return (
		<div className="py-4">
			<div className="flex items-center">
				<div className="flex-col text-left">
					<h4 className="text-sm font-bold ">{review.author}</h4>
					<div className="mt-1 flex flex-row items-center gap-2">
						<div className="flex items-center justify-end">
							<ProductRatingItem rating={4} />
						</div>
						<p className="sr-only">{review.rating} out of 5 stars</p>
					</div>
				</div>
			</div>
			<div className="text-left">
				<p className="mb-2 mt-4 space-y-6 text-sm font-bold">{review.title}</p>
				<p className="mb-2 mt-4 space-y-6 text-sm italic">{review.description}</p>
			</div>
		</div>
	);
}
