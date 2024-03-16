"use server";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getCartFromCookies } from "@/api/cart";
import { executeGraphql } from "@/api/gql";
import { CartChangeItemQuantityDocument, CartRemoveProductDocument } from "@/gql/graphql";

export const changeItemQuantity = (id: string, productId: string, quantity: number) => {
	return executeGraphql({
		query: CartChangeItemQuantityDocument,
		variables: { id, productId, quantity },
	});
};

export const removeItem = async (id: string, productId: string) => {
	const graphqlResponse = await executeGraphql({
		query: CartRemoveProductDocument,
		variables: {
			id,
			productId,
		},
	});
	return graphqlResponse;
};

export async function handleStripePaymentAction() {
	"use server";

	if (!process.env.STRIPE_SECRET_KEY) {
		throw new Error("Missing STRIPE_SECRET_KEY env variable");
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});

	const cart = await getCartFromCookies();
	if (!cart) {
		return;
	}

	const current_domain = headers();
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card", "paypal"],
		metadata: {
			cartId: cart.id,
		},
		line_items: cart.items.map((item) => ({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.product.name,
				},
				unit_amount: item.product.price,
			},
			quantity: item.quantity,
		})),
		mode: "payment",
		success_url: `${current_domain.get("origin")}/cart/success?sessionId={CHECKOUT_SESSION_ID}`,
		cancel_url: `${current_domain.get("origin")}/cart/cancel`,
	});
	if (!session.url) {
		throw new Error("Something went wrong");
	}
	cookies().set("cartId", "");
	redirect(session.url);
}
