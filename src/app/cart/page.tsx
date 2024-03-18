import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { executeGraphql } from "@/api/gql";
import { GetCardByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";
import { IncrementItemButton } from "@/app/cart/IncrementItemButton";
import { RemoveProductButton } from "@/app/cart/RemoveProductButton";
import { handleStripePaymentAction } from "@/app/cart/actions";
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
		<div>
			<h1>Order #{cart.id} summary</h1>
			<Suspense fallback={<Loader />}>
				<div>
					<div>
						<div>Product</div>
						<div className="w-64">Quantity</div>
						<div>Price</div>
					</div>

					<div>
						{cart.items.map((item) => {
							if (!item.product) {
								return null;
							}
							return (
								<div key={item.product.id}>
									<div>
										<Link href={`/product/${item.product.id}`}>{item.product.name}</Link>
									</div>
									<div>
										<div className="flex h-8 w-64">
											<IncrementItemButton
												cartId={cart.id}
												productId={item.product.id}
												quantity={item.quantity}
											/>
											<RemoveProductButton cartId={cart.id} productId={item.product.id} />
										</div>
									</div>
									<div>{formatMoney(item.product.price * item.quantity)}</div>
								</div>
							);
						})}
					</div>
				</div>
			</Suspense>
			<form action={handleStripePaymentAction} className="ml-auto">
				<button
					type="submit"
					className="rounded-sm border bg-slate-100 px-8 py-2 shadow-sm transition-colors hover:bg-slate-200"
				>
					Pay
				</button>
			</form>
		</div>
	);
}
