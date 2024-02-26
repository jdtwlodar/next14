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
			<h1>Category Product Page</h1>
			<p>Category: {params.category}</p>
			<p>Page: {params.pageNumber}</p>
		</div>
	);
}
