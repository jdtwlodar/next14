"use client";

//import { addSingleProductReview } from "@/api/products";
import { useState } from "react";
import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { RatingInputStars } from "@/components/atoms/RatingInputStars";
import { ProductAddReviewAction } from "@/api/actions";
export const RatingForm = ({ product }: { product: ProductsListItemFragmentFragment }) => {
	const [formData] = useState(new FormData());
	console.log("form data in form", formData, formData.values());
	const [selectedOption, setSelectedOption] = useState("");

	const handleratingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);
		formData.set("rating", e.target.value);
		//setFormData(formData);
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formData.set("productId", product.id || "0");
		console.log(
			"form in submit",
			"type prod id",
			typeof formData.get("productId"),
			"type name",
			typeof formData.get("name"),
			formData.get("productId"),
			formData.get("content"),
			formData.get("name"),
			formData.get("email"),
			formData.get("rating"),
			formData.get("headline") || "no title",
		);
		await ProductAddReviewAction(
			formData.get("name") as string,
			formData.get("content") as string,
			formData.get("email") as string,
			product.id,
			formData.get("rating") as string,
			formData.get("headline") as string,
		);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		formData.set(name, value);
	};
	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		formData.set(name, value);
	};
	if (!product.id) return <div>no id</div>;
	return (
		<>
			<div className="mt-10">
				<h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
				<p className="mt-1 text-sm text-gray-600">
					If you’ve used this product, share your thoughts with other customers
				</p>
				<form
					data-testid="add-review-form"
					onSubmit={onSubmit}
					className="mt-2 flex flex-col gap-y-2"
				>
					<input type="hidden" value={product.id} name="productId" />
					<label>
						<span className="text-xs text-gray-700">Review title</span>
						<input
							onChange={handleInputChange}
							required
							className="mt-1 block w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
							name="headline"
						/>
					</label>
					<label>
						<span className="text-xs text-gray-700">Review content</span>
						<textarea
							onChange={handleTextAreaChange}
							defaultValue={""}
							required
							className="mt-1 block max-h-48 min-h-[2.5rem] w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:outline-none focus:ring  focus:ring-blue-200 focus:ring-opacity-50"
							name="content"
						></textarea>
					</label>
					<div>
						<span className="text-xs text-gray-700">Rating</span>

						<RatingInputStars
							options={[
								{ value: "1" },
								{ value: "2" },
								{ value: "3" },
								{ value: "4" },
								{ value: "5" },
							]}
							selectedValue={selectedOption}
							onChange={handleratingChange}
							name="rating"
						/>
					</div>
					<label>
						<span className="text-xs text-gray-700">Name</span>
						<input
							required
							onChange={handleInputChange}
							className="mt-1 block w-full rounded-md border-gray-300 text-sm font-light shadow-sm focus:border-blue-300 focus:outline-none focus:ring 
                              focus:ring-blue-200 focus:ring-opacity-50"
							name="name"
						/>
					</label>
					<label>
						<span className="text-xs text-gray-700">Email</span>
						<input
							required
							onChange={handleInputChange}
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
