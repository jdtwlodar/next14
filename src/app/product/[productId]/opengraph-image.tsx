import { ImageResponse } from "next/og";
import { getProductById } from "@/api/products";

// export const runtime = "edge";
export const contentType = "image/png";
export const alt = "Open Graph Image";

export const size = {
	width: 1035,
	height: 543,
};

export default async function OpenGraphImageForSingleProduct({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getProductById(params.productId);

	if (!product) {
		return new ImageResponse(<div>Product not found</div>);
	}
	return new ImageResponse(
		(
			<div tw="flex bg-white w-full h-full justify-items-center items-center">
				<div tw="flex items-center justify-center border-gray-300 border-5  w-1/2">
					{product.images[0] && (
						<img
							src={product.images[0]?.url}
							alt={product.images[0].alt}
							height={200}
							width={200}
						/>
					)}
				</div>

				<h2 tw="flex flex-col text-gray-900 text-left pr-5">
					<span tw="text-gray-500 text-xl">{product?.categories[0]?.name}</span>
					<span tw="text-3xl">{product.name}</span>
				</h2>
			</div>
		),
	);
}
