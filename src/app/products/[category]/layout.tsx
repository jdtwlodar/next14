export const generateStaticParams = async () => {
	return [
		{
			category: "shoes",
		},
		{
			category: "t-shirts",
		},
	];
};
export default function CategoryProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h1>Category Product Layout</h1>
			{children}
		</div>
	);
}
