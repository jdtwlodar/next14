import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "md", "mdx"],
	experimental: {
		typedRoutes: true,
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.fna.fbcdn.net",
				pathname: "/v/**",
			},
			{
				protocol: "https",
				hostname: "naszsklep-api.vercel.app",
			},
			{
				protocol: "https",
				hostname: "static-ourstore.hyperfunctor.com",
			},
		],
	},
};

export default withMDX()(nextConfig);
