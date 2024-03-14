"use client";
import { useOptimistic } from "react";
import { changeItemQuantity } from "./actions";
import { Icon } from "@/components/atoms/Icon";

export const IncrementItemButton = ({
	id,
	productId,
	quantity,
}: {
	id: string;
	productId: string;
	quantity: number;
}) => {
	const [quantityOptimistic, setQuantityOptimistic] = useOptimistic(
		quantity,
		(_prevState, nextState: number) => nextState,
	);

	return (
		<form>
			<button
				type="submit"
				formAction={async () => {
					setQuantityOptimistic(quantityOptimistic + 1);
					await changeItemQuantity(id, productId, quantityOptimistic + 1);
				}}
				data-testid="increment"
				disabled={quantityOptimistic === 100}
				className=" rounded-md border bg-slate-700 p-1 text-white disabled:cursor-wait disabled:bg-slate-400"
			>
				<Icon name="plus" />
			</button>
			{quantityOptimistic}
			<button
				type="submit"
				disabled={quantityOptimistic < 1}
				formAction={async () => {
					setQuantityOptimistic(quantityOptimistic - 1);
					await changeItemQuantity(id, productId, quantityOptimistic - 1);
				}}
				data-testid="increment"
				className=" rounded-md border bg-slate-700 p-1 text-white disabled:cursor-wait disabled:bg-slate-400"
			>
				<Icon name="minus" />
			</button>
		</form>
	);
};
