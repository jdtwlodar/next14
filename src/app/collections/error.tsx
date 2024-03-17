"use client";
export default function ErrorPage({ error }: { error: Error }) {
	return (
		<div>
			<h1>Error</h1>
			<p>{error.message}</p>
			<p>Sorry, there was a problem loading the page.</p>
		</div>
	);
}
