"use client";
import { useCallback, type ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const options = ["price ASC", "price DESC"];

export const ProductListSortSelect = ({ sort }: { sort: string }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createUrlFromSortString = useCallback((sortString: string): string => {
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
			default:
				break;
		}
		const test = new URLSearchParams(`orderBy=${orderBy}&order=${sortOrder}`);
		return test as unknown as string;
	}, []);
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
		// now you got a read/write object
		const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

		// update as necessary
		const value = event.target.value.trim();

		/* 	if (!value) {
			current.delete("orderBy");
		} else {
			current.set("orderBy", event.target.value);
		} */

		const sortt = createUrlFromSortString(value.toString());
		const test = new URLSearchParams(sortt);
		const query = sortt ? `?${test}` : "";
		//needfix

		router.push(pathname + query);
	};

	return (
		<select value={sort} onChange={onSelect}>
			<option value="">None</option>
			{options.map((opt) => (
				<option key={opt} value={opt}>
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
