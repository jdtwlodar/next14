"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useState, useEffect } from "react";

export const SearchBar = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("query");
	const [searchQuery, setSearchQuery] = useState(query || "");
	const handleInputSubmit = () => {
		if (searchQuery.length < 2) return;
		router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
	};
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			handleInputSubmit();
		}, 500);

		return () => clearTimeout(timeoutId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery]);

	return (
		<div className="text-gray-900">
			<input
				type="search"
				name="search"
				value={searchQuery}
				onChange={handleInputChange}
				placeholder="Search..."
				className="h-8 w-64 rounded-md border-pink-600 bg-blue-900 px-2 text-white transition-all duration-150 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600"
			/>
		</div>
	);
};
