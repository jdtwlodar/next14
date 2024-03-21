//Zaimplementuj dodawanie recenzji produktów na podstawie podanej makiety. - Formularz powinien mieć 5 pól o następujących nazwach: headline (tytuł recenzji), content (treść), rating (ocena), name (nazwa użytkownika) oraz email. - Do formularza dodaj atrybut data-testid="add-review-form".

export const RatingForm = () => {
	return (
		<>
			<form data-testid="add-review-form" className="flex flex-col gap-4">
				<input type="text" name="headline" placeholder="headline" />
				<input type="text" name="content" placeholder="content" />
				<input type="text" name="rating" placeholder="rating" />
				<input type="text" name="name" placeholder="name" />
				<input type="text" name="email" placeholder="email" />
			</form>
			<div className="mt-10">
				<h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
				<p className="mt-1 text-sm text-gray-600">
					If you’ve used this product, share your thoughts with other customers
				</p>
				<form data-testid="add-review-form" action="" className="mt-2 flex flex-col gap-y-2">
					<input type="hidden" value="UHJvZHVjdDoz" name="productId" />
					<label>
						<span className="text-xs text-gray-700">Review title</span>
						<input
							required
							className="mt-1 block w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							name="headline"
						/>
					</label>
					<label>
						<span className="text-xs text-gray-700">Review content</span>
						<textarea
							required
							className="mt-1 block max-h-48 min-h-[2.5rem] w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:outline-none focus:ring  focus:ring-blue-200 focus:ring-opacity-50"
							name="content"
						></textarea>
					</label>
					<div>
						<span className="text-xs text-gray-700">Rating</span>
						<fieldset className="stars-rating flex flex-row-reverse justify-end">
							<input className="sr-only" id="rating-5" type="radio" value="5" name="rating" />
						</fieldset>
					</div>
					<label>
						<span className="text-xs text-gray-700">Name</span>
						<input
							required
							className="mt-1 block w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:outline-none focus:ring 
                              focus:ring-blue-200 focus:ring-opacity-50"
							name="name"
						/>
					</label>
					<label>
						<span className="text-xs text-gray-700">Email</span>
						<input
							required
							className="mt-1 block w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:outline-none focus:ring 
                               focus:ring-blue-200 focus:ring-opacity-50"
							type="email"
							name="email"
						/>
					</label>
					<button
						type="submit"
						className="mt-6 inline-flex w-full items-center justify-center rounded-md
                                bg-gray-900 px-8 py-2 text-sm font-medium text-gray-50 hover:bg-gray-700 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					>
						Submit review
					</button>
				</form>
			</div>
		</>
	);
};
