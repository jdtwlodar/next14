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
		<select value={sort} onChange={onSelect}>
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
/* import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

export const ProductListSortSelect = () => {
	const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
	(name: string, value: string) => {
	  const params = new URLSearchParams(searchParams.toString())
	  params.set(name, value)
 
	  return params.toString()
	},
	[searchParams]
  )


	const handleChangeSort = async (e: ChangeEvent<HTMLSelectElement>) => {

		if (e.target.value === "no-sort") {
			router.push(`/products/1`);
		} else {
			router.push(pathname + '?sort = ' + createQueryString('sort', 'asc')) + 
		}
	};
	return (


		<div>
			<label htmlFor="sort"></label>
			<select onChange={handleChangeSort} className="arrow-down-bg block w-48 cursor-pointer appearance-none rounded-md border-gray-300 px-2 py-1 text-sm font-light shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 lg:mt-1">
				<option value="weightedRating↓" data-testid="sort-by-rating">
					Rating (High to Low)
				</option>
				<option value="weightedRating↑" data-testid="sort-by-rating">
					Rating (Low to High)
				</option>
				<option value="name↑">Name (A-Z)</option>
				<option value="name↓">Name (Z-A)</option>
				<option value="price↑" data-testid="sort-by-price">
					Price (Low to High)
				</option>
				<option value="price↓" data-testid="sort-by-price">
					Price (High to Low)
				</option>
			</select>
		</div>
	);
};
 */
