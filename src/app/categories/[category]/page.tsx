//reditect to page categories/[category]/[pageNumber]
"use client";
import { useRouter } from "next/navigation";

export default function CategoryProductsPage({ params }: { params: { category: string } }) {
	const router = useRouter();
	router.push(`/categories/${params.category}/1`);
}
