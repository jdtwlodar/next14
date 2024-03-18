import { getProductsCategoryList } from "@/api/products";

export const generateStaticParams = async () => {
	const categories = await getProductsCategoryList();
	return categories.map((category) => ({
		category: category.slug,
	}));
};
export default function CategoryProductLayout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
