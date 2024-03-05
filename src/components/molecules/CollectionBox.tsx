import { type Route } from "next";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";

export async function CollectionBox() {
	const collctions = await getCollectionsList(10);
	if (!collctions) {
		return <div>No collections</div>;
	}
	return (
		<div>
			<div>
				{collctions.map((collection) => (
					<div key={collection.name}>
						<Link href={`/collections/${collection.slug}` as Route}>{collection.name}</Link>
					</div>
				))}
			</div>
		</div>
	);
}
