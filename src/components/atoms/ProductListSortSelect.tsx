"use client";

import { type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { type Route } from "next";

const options = ["price ASC", "price DESC"];
const options_rating = ["rating ASC", "rating DESC"];

export const ProductListSortSelect = ({ sort }: { sort: string }) => {
	const router = useRouter();
	const pathname = usePathname();
	const createUrlFromSortString = (sortString: string): string => {
		const [field, order] = sortString.split(" ");

		let orderBy = "" || field;
		let sortOrder = "";

		// Converting order to ASC or DESC
		switch (order?.toUpperCase()) {
			case "ASC":
				orderBy = field;
				sortOrder = "ASC";
				break;
			case "DESC":
				orderBy = field;
				sortOrder = "DESC";
				break;
			case "":
				orderBy = "";
				sortOrder = "";
				break;
			default:
				break;
		}
		const test = `${pathname}?orderBy=${orderBy}&order=${sortOrder}`;
		return test as unknown as string;
	};

	const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		// now you got a read/write object
		const value = event.target.value.trim();
		// update as necessary

		const sortt = value.toString();

		const query = sortt ? createUrlFromSortString(sortt) : pathname;
		//needfix
		console.log("sortt", sortt, "query", query, "ppp", pathname);

		router.push(query as Route);
	};

	return (
		<select
			className="w-54 mt-1 block rounded-md border-pink-600  bg-blue-900 px-3 py-2  text-sm font-light text-white shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
			value={sort}
			onChange={onSelect}
		>
			<option value="">None</option>
			{options.map((opt) => (
				<option data-testid="sort-by-price" key={opt} value={opt}>
					{opt}
				</option>
			))}
			{options_rating.map((opt) => (
				<option data-testid="sort-by-rating" key={opt} value={opt}>
					{opt}
				</option>
			))}
		</select>
	);
};
