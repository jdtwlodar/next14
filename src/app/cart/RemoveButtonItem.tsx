export const removeButton = () => {
	return (
		<button
			type="submit"
			data-testid="remove-item-button"
			className="w-full rounded-md border bg-slate-700 px-8 py-3 text-white disabled:cursor-wait disabled:bg-slate-400"
		>
			Remove item
		</button>
	);
};
