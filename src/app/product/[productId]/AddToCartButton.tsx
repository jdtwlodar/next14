"use client";

import { useFormStatus } from "react-dom";

export function AddToCartButton() {
	const status = useFormStatus();

	return (
		<button
			type="submit"
			disabled={status.pending}
			data-testid="add-to-cart-button"
			className="w-full rounded-md border border-none bg-gradient-to-t from-blue-800 to-pink-600 px-8  py-3 text-white outline-none transition-all duration-300 hover:from-pink-600 hover:to-blue-800 disabled:cursor-wait disabled:bg-slate-400"
		>
			Add to cart
		</button>
	);
}
