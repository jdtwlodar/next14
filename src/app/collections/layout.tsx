import { getCollectionsList } from "@/api/collections";

export const generateStaticParams = async () => {
	const colelctions = await getCollectionsList(10);
	return colelctions.map((category) => ({
		category: category.slug,
	}));
};
export default function ColectionLayout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
