"use client";
import { useOptimistic, useTransition } from "react";
import { useRouter } from "next/navigation";
import { changeItemQuantity } from "./actions";
import { Icon } from "@/components/atoms/Icon";

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
		<form>
			<button
				formAction={async () => {
					setQuantityOptimistic(quantityOptimistic + 1);
					await changeItemQuantity(cartId, productId, quantityOptimistic + 1);
				}}
				data-testid="increment"
				disabled={isPending || quantityOptimistic === 100}
				className=" rounded-md border bg-slate-700 p-1 text-white disabled:cursor-wait disabled:bg-slate-400"
			>
				<Icon name="plus" />
			</button>
			{quantityOptimistic}
			<div>
				<button
					disabled={quantityOptimistic < 1}
					className=" rounded-md border bg-slate-700 p-1 text-white disabled:cursor-wait disabled:bg-slate-400"
					formAction={async () => {
						setQuantityOptimistic(quantityOptimistic - 1);
						startTransition(async () => {
							await changeItemQuantity(cartId, productId, quantityOptimistic - 1);
							router.refresh();
						});
					}}
					data-testid="increment"
				>
					<Icon name="minus" />
				</button>
			</div>
		</form>
	);
};
