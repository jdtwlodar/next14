import { notFound } from "next/navigation";
import { getProdcutsByCategoryBySlug } from "@/api/products";
import { ProductsList } from "@/components/organisms/ProductsList";
import { Pagination } from "@/components/molecules/Pagination";

export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	if (params.category === "shoes") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	}
};

export default async function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	const category = await getProdcutsByCategoryBySlug(params.category);
	if (!category) {
		return notFound();
	}
	return (
		<div>
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-8">
					<div className="mx-auto py-8">
						<h1 className="text-bold">{category.name}</h1>
						<div className="py-2 text-center">{category.description}</div>
					</div>
				</div>
			</div>

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<ProductsList
						products={category.products.slice(
							4 * parseInt(params.pageNumber, 10) - 4,
							4 * parseInt(params.pageNumber, 10),
						)}
					/>
					{4 * parseInt(params.pageNumber, 10)}
					<Pagination
						url={`/categories/${params.category}/`}
						currentPage={parseInt(params.pageNumber, 10)}
						itemsPerPage={4}
						totalProducts={category.products.length}
					/>
				</div>
			</div>
		</div>
	);
}
