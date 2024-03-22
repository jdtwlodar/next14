import { ProductRatingItem } from "@/components/atoms/ProductRatingItem";
import { type ProductSingleReviewFragmentFragment } from "@/gql/graphql";

export async function ReviewSingle({ review }: { review: ProductSingleReviewFragmentFragment }) {
	if (!review) {
		return <div>No reviews</div>;
	}
	return (
		<div className="py-12">
			<div className="flex items-center">
				<div className="ml-4">
					<h4 className="text-sm font-bold text-gray-900">Dan Terry-Schaefer</h4>
					<div className="mt-1 flex flex-row items-center gap-2">
						<p aria-hidden="true" className="small-caps text-sm">
							4/5
						</p>
						<div className="flex items-center justify-end">
							<ProductRatingItem rating={4} />
						</div>
						<p className="sr-only">{review.rating} out of 5 stars</p>
					</div>
				</div>
			</div>
			<div className="">
				<p className="mb-2 mt-4 space-y-6 text-sm font-bold text-gray-600">
					Canonicus atqui solio tamquam amitto barba.
				</p>
				<p className="mt-2 text-sm italic text-gray-600">
					Tremo armarium contego aqua calco victoria. Cumque ipsum sumptus timidus umquam virtus
					adaugeo tonsor asperiores. Tantum abbas quibusdam crux causa cibo.
				</p>
				<p className="mt-2 text-sm italic text-gray-600">
					Somniculosus cruciamentum thymum videlicet. Cohibeo delinquo tribuo patior demitto.
					Accommodo uxor acervus hic cum defendo alias speculum accusantium vero.
				</p>
				<p className="mt-2 text-sm italic text-gray-600">
					Voluptates adsum antepono derideo. Amicitia minus virtus vulgivagus comminor est subiungo
					defleo. Aurum cogito teres ad aequus desparatus.
				</p>
			</div>
		</div>
	);
}
