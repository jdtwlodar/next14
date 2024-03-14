import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/gql";
import { GetCardByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";
import { IncrementItemButton } from "@/app/cart/IncrementItemButton";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { cart } = await executeGraphql(GetCardByIdDocument, { id: cartId });
	if (!cart) {
		redirect("/");
	}

	return (
		<div>
			<h1>Order #{cart.id} summary</h1>
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{cart.items.map((item) => {
						if (!item.product) {
							return null;
						}
						return (
							<tr key={item.product.id}>
								<td>{item.product.name}</td>
								<td>
									<div className="flex">
										<IncrementItemButton
											id={cart.id}
											productId={item.product.id}
											quantity={item.quantity}
										/>
									</div>
								</td>
								<td>{formatMoney(item.product.price * item.quantity)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
