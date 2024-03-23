import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import { Suspense } from "react";
import { executeGraphql } from "@/api/gql";
import { GetCardByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";
import { IncrementItemButton } from "@/app/cart/IncrementItemButton";
import { RemoveProductButton } from "@/app/cart/RemoveProductButton";
import { handleStripePaymentAction } from "@/api/actions";
import { Loader } from "@/components/atoms/Loader";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { cart } = await executeGraphql({ query: GetCardByIdDocument, variables: { id: cartId } });
	if (!cart) {
		redirect("/");
	}

	return (
		<div className="flex min-h-screen flex-col items-center py-2">
			<div className="flex w-full max-w-screen-xl flex-1 flex-col items-center justify-center px-20 text-center">
				<article>
					<h1 className="my-8 py-4 text-2xl font-bold text-pink-600">Order #{cart.id} summary</h1>
					<Suspense fallback={<Loader />}>
						<div>
							<div>
								{cart.items.map((item) => {
									if (!item.product) {
										return null;
									}
									return (
										<div className="flex border-b border-b-pink-600 py-4" key={item.product.id}>
											<div className="flex w-1/3 flex-col items-center gap-y-2">
												<div className="">{item.product.name}</div>
												<Link href={`/product/${item.product.id}`}>
													{item.product.images[0] && (
														<NextImage
															width={100}
															height={150}
															className="rounded-md object-cover"
															src={item.product.images[0].url}
															quality={75}
															alt={item.product.images[0].alt}
															loading="lazy"
														/>
													)}
												</Link>
											</div>
											<div className="flex w-1/3  items-center ">
												<div className="flex items-center">
													Quantity:
													<IncrementItemButton
														cartId={cart.id}
														productId={item.product.id}
														quantity={item.quantity}
													/>
													<RemoveProductButton cartId={cart.id} productId={item.product.id} />
												</div>
											</div>
											<div className="flex w-1/3 items-center">
												Price :{formatMoney(item.product.price * item.quantity)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</Suspense>
					<form action={handleStripePaymentAction} className="tex-center ml-auto mt-6">
						<button
							type="submit"
							className="w-54 rounded-md border border-none bg-gradient-to-t from-blue-800 to-pink-600 px-8  py-3 text-white outline-none transition-all duration-300 hover:from-pink-600 hover:to-blue-800 disabled:cursor-wait disabled:bg-slate-400"
						>
							<span className="pr-1">Pay</span>
							{formatMoney(
								cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
							)}
						</button>
					</form>
				</article>
			</div>
		</div>
	);
}
