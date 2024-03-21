"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { removeItem } from "../../api/actions";

export function RemoveProductButton({ cartId, productId }: { productId: string; cartId: string }) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(cartId, productId);
					router.refresh();
				})
			}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			X
		</button>
	);
}
