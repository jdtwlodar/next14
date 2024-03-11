import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { executeGraphql } from "@/api/gql";
import { GetCardByIdDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils/money";

export default async function CartPage() {
	const cartId = cookies().get("cartId")?.value;

	if (!cartId) {
		redirect("/");
	}

	const { cart } = await executeGraphql(GetCardByIdDocument, { id: cartId });
	if (!cart) {
		redirect("/");
	}
	console.log("cart in cart", cart);

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
								<td>{item.quantity}</td>
								<td>{formatMoney(item.product.price)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
