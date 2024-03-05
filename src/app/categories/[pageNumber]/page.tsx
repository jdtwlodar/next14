export const generateStaticParams = async ({ params }: { params: { category: string } }) => {
	if (params.category === "shoes") {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	} else {
		return [{ pageNumber: "1" }, { pageNumber: "2" }];
	}
};

export default function CategoryProductPage({
	params,
}: {
	params: { category: string; pageNumber: string };
}) {
	return (
		<div>
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-8">
					<div className="mx-auto py-8">
						<h1 className="text-bold">T-Shirts</h1>
					</div>
				</div>
			</div>
			<p>Category: {params.category}</p>
			<p>Page: {params.pageNumber}</p>
		</div>
	);
}
