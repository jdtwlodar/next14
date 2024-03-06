import NextImage from "next/image";

export const ProductCoverImage = ({
	url,
	alt,
	height,
	width,
}: {
	url: string;
	alt: string;
	height: number;
	width: number;
}) => {
	return (
		<div className="aspect-square overflow-hidden rounded-md border bg-slate-50 hover:bg-slate-100">
			<NextImage
				width={width}
				height={height}
				src={url}
				alt={alt}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
