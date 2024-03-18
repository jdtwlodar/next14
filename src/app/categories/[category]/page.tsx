import { redirect } from "next/navigation";
import { getProductsCategoryList } from "@/api/products";

export const generateStaticParams = async () => {
	const categories = await getProductsCategoryList();
	return categories.map((category) => ({
		category: category.slug,
	}));
};

export default function CategoryProductsPage({ params }: { params: { category: string } }) {
	redirect(`/categories/${params.category}/1`);
}
