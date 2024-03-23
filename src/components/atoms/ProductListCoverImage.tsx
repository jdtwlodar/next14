import NextImage from "next/image";

export const ProductCoverImage = ({ url, alt }: { url: string; alt: string }) => {
	return (
		<div className="aspect-square  overflow-hidden rounded-md border border-pink-600 hover:bg-pink-600">
			<NextImage
				width={150}
				height={150}
				src={url}
				quality={55}
				loading="lazy"
				alt={alt}
				className="h-full w-full object-cover object-center p-4 drop-shadow-2xl  transition-transform hover:scale-105"
			/>
		</div>
	);
};
