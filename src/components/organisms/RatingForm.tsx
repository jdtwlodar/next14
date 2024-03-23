"use client";

//import { addSingleProductReview } from "@/api/products";
import { useState } from "react";
import { type ProductsListItemFragmentFragment } from "@/gql/graphql";
import { RatingInputStars } from "@/components/atoms/RatingInputStars";
import { ProductAddReviewAction } from "@/api/actions";
export const RatingForm = ({ product }: { product: ProductsListItemFragmentFragment }) => {
	const [formData] = useState(new FormData());
	const [selectedOption, setSelectedOption] = useState("");
	const [showForm, setShowForm] = useState(true);

	const handleratingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);
		formData.set("rating", e.target.value);
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		formData.set("productId", product.id || "0");
		//TODO fix in future
		await ProductAddReviewAction(
			formData.get("name") as string,
			formData.get("content") as string,
			formData.get("email") as string,
			product.id,
			formData.get("rating") as string,
			formData.get("headline") as string,
		);

		setShowForm(false);
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
			<div className="mt-10 flex">
				{showForm && (
					<div>
						<h3 className="text-lg font-medium text-pink-600">Share your thoughts</h3>
						<p className="mt-1 text-sm ">
							If you’ve used this product, share your thoughts with other customers
						</p>
						<form
							data-testid="add-review-form"
							onSubmit={onSubmit}
							className="mt-2 flex flex-col gap-y-2"
						>
							<input type="hidden" value={product.id} name="productId" />
							<label>
								<span className=" text-pink-600">Review title</span>
								<input
									onChange={handleInputChange}
									required
									className="mt-1 block w-full rounded-md border-pink-600  bg-blue-900 px-3 py-2  text-sm font-light text-white shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
									name="headline"
								/>
							</label>
							<label>
								<span className=" text-pink-600">Review content</span>
								<textarea
									onChange={handleTextAreaChange}
									defaultValue={""}
									required
									className="mt-1 block max-h-48 min-h-[2.5rem] w-full rounded-md border-pink-600  bg-blue-900 px-3 py-2  text-sm font-light text-white shadow-sm focus:border-blue-600 focus:outline-none focus:ring  focus:ring-blue-500 focus:ring-opacity-50"
									name="content"
								></textarea>
							</label>
							<div className="flex items-center justify-center gap-4">
								<span className=" text-pink-600">Rating</span>

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
								<span className=" text-pink-600">Name</span>
								<input
									required
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-pink-600  bg-blue-900 px-3 py-2  text-sm font-light text-white shadow-sm focus:border-blue-600 focus:outline-none focus:ring 
                              focus:ring-blue-500 focus:ring-opacity-50"
									name="name"
								/>
							</label>
							<label>
								<span className=" text-pink-600">Email</span>
								<input
									required
									onChange={handleInputChange}
									className="mt-1 block w-full rounded-md border-pink-600  bg-blue-900 px-3 py-2  text-sm font-light text-white shadow-sm focus:border-blue-600 focus:outline-none focus:ring 
                               focus:ring-blue-500 focus:ring-opacity-50"
									type="email"
									name="email"
								/>
							</label>
							<button
								type="submit"
								className="mt-6 inline-flex w-full items-center justify-center rounded-md
								bg-gradient-to-r from-blue-800 to-pink-600 py-4"
							>
								Submit review
							</button>
						</form>
					</div>
				)}
				{!showForm && <div className="py-4  text-center text-2xl font-bold">Thank You</div>}
			</div>
		</>
	);
};
