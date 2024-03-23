"use client";
import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { changeItemQuantity } from "@/api/actions";

export const IncrementItemButton = ({
	cartId,
	productId,
	quantity,
}: {
	cartId: string;
	productId: string;
	quantity: number;
}) => {
	const [isPending, startTransition] = useTransition();
	const [quantityOptimistic, setQuantityOptimistic] = useOptimistic(
		quantity,
		(_prevStateOptimistic, newStateOptimistic: number) => {
			return newStateOptimistic;
		},
	);

	const router = useRouter();
	return (
		<form className="ml-2 flex w-24 gap-2">
			<button
				type="submit"
				className="flex h-6 w-6 items-center justify-center rounded-md border border-pink-600  text-2xl font-semibold text-white shadow-lg  transition-transform duration-150 hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-45"
				disabled={quantityOptimistic < 1}
				formAction={() => {
					startTransition(async () => {
						setQuantityOptimistic(quantityOptimistic - 1);

						await changeItemQuantity(cartId, productId, quantityOptimistic - 1);
						router.refresh();
					});
				}}
				data-testid="decrement"
			>
				<Minus />
			</button>
			<div data-testid="quantity">
				{isPending && <span aria-busy="true"></span>}
				{quantityOptimistic}
			</div>
			<button
				type="button"
				className="flex h-6 w-6 items-center justify-center rounded-md border border-pink-600  text-2xl font-bold text-white shadow-lg  transition-transform duration-150 hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-45"
				onClick={() => {
					startTransition(async () => {
						setQuantityOptimistic(quantityOptimistic + 1);

						await changeItemQuantity(cartId, productId, quantityOptimistic + 1);
						router.refresh();
					});
				}}
				data-testid="increment"
				disabled={quantityOptimistic === 100 || isPending}
			>
				<Plus />
			</button>
		</form>
	);
};
