import Stripe from "stripe";

export default async function CartSuccess({
	searchParams,
}: {
	searchParams: { sessionId: string };
}) {
	if (!process.env.STRIPE_SECRET_KEY) {
		return null;
	}

	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2023-10-16",
		typescript: true,
	});
	const stripeCheckoutSession = await stripe.checkout.sessions.retrieve(searchParams.sessionId);
	//add mores tyles
	return <div>{stripeCheckoutSession.payment_status}</div>;
}
