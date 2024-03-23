import { type Route } from "next";
import Link from "next/link";
import { getCollectionsList } from "@/api/collections";

export async function CollectionBox() {
	const collctions = await getCollectionsList(10);
	if (!collctions) {
		return <div>No collections</div>;
	}
	return (
		<div className="flex w-full flex-col gap-2 md:flex-row md:gap-x-6 ">
			{collctions.map((collection) => (
				<div
					className="hover:text-pink rounded-md bg-gradient-to-r from-pink-600 to-blue-800 px-4 py-16 text-xl shadow-inner shadow-pink-600/50 transition-all duration-150 hover:scale-105 hover:shadow-blue-900/50 md:w-1/3"
					key={collection.name}
				>
					<Link href={`/collections/${collection.slug}` as Route}>{collection.name}</Link>
				</div>
			))}
		</div>
	);
}
