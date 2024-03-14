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
		(quantityOptimistic) => quantityOptimistic + 1,
	);

	return (
		<form>
			<button
				type="submit"
				formAction={async () => {
					setQuantityOptimistic(quantityOptimistic);
					await changeItemQuantity(id, productId, quantityOptimistic + 1);
				}}
				data-testid="increment"
				className=" rounded-md border bg-slate-700 p-1 text-white disabled:cursor-wait disabled:bg-slate-400"
			>
				<Icon name="plus" />
			</button>
		</form>
	);
};
