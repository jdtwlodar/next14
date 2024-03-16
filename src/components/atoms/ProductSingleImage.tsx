import NextImage from "next/image";

export const ProductSingleImage = ({
	url,
	alt,
	width,
	height,
}: {
	url: string;
	alt: string;
	width: number;
	height: number;
}) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<NextImage
				width={width}
				height={height}
				priority
				src={url}
				alt={alt}
				className="h-full w-full object-contain object-center p-4"
			/>
		</div>
	);
};
