"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CircleX } from "lucide-react";
import { removeItem } from "@/api/actions";

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
			className="text-sm font-medium text-red-700 hover:text-red-800 disabled:cursor-wait disabled:text-slate-400"
		>
			<CircleX />
		</button>
	);
}
