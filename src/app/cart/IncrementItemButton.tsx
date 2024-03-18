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
	const [_isPending, startTransition] = useTransition();
	const [quantityOptimistic, setQuantityOptimistic] = useOptimistic(
		quantity,
		(_prevStateOptimistic, newStateOptimistic: number) => {
			return newStateOptimistic;
		},
	);
	const router = useRouter();
	return (
		<form className="flex w-24 gap-2">
			<button
				type="submit"
				className="block h-3 w-3 bg-slate-700 "
				formAction={() => {
					startTransition(async () => {
						setQuantityOptimistic(quantityOptimistic + 1);

						await changeItemQuantity(cartId, productId, quantityOptimistic + 1);
						router.refresh();
					});
				}}
				data-testid="increment"
				disabled={quantityOptimistic === 100}
			>
				<Icon
					name="plus"
					className="rounded-md border bg-slate-700 p-1 text-white  disabled:bg-slate-400"
				/>
			</button>
			<div data-testid="quantity">{quantityOptimistic}</div>
			<div>
				<button
					type="submit"
					className="h-3 w-3 bg-slate-700 "
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
					<Icon
						name="minus"
						className=" rounded-md border bg-slate-700 p-1 text-white  disabled:bg-slate-400"
					/>
				</button>
			</div>
		</form>
	);
};
