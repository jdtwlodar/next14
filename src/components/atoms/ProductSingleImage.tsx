import NextImage from "next/image";

export const ProductSingleImage = ({ url, alt }: { url: string; alt: string }) => {
	return (
		<div className="transform-all aspect-square transform overflow-hidden rounded-md border border-pink-600 duration-300 hover:scale-105">
			<NextImage
				width={200}
				height={200}
				quality={75}
				src={url}
				alt={alt}
				loading="lazy"
				className="h-full w-full object-contain object-center p-4"
			/>
		</div>
	);
};
