import NextImage from "next/image";

export const ProductSingleImage = ({ url, alt }: { url: string; alt: string }) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<NextImage
				width={200}
				height={200}
				priority
				src={url}
				alt={alt}
				className="h-full w-full object-contain object-center p-4"
			/>
		</div>
	);
};
