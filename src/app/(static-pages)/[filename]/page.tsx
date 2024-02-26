import { notFound } from "next/navigation";
import { type ComponentType } from "react";

export default async function StaticPagesFilenamePage({
	params,
}: {
	params: { filename: string };
}) {
	const Page = await import(`./${params.filename}.mdx`).then(
		(module: { default: ComponentType }) => module.default,
		() => notFound(),
	);
	return (
		<article className="prose lg:prose-xl">
			<Page />
		</article>
	);
}
