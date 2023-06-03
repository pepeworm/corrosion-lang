/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			tn: "320px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			"2xl": "1536px"
		},
		extend: {
			colors: {

				"text-link": "#aef39e",
				"text-highlight": "#7ad367",
				"text-header": "#ffffffe6",
				"text-body": "#ffffff99",
				"bg-primary": "#111d25",
				"bg-secondary": "#1c2830",
				"bg-tertiary": "#202c34",
				border: "#ffffff0d",
				"text-footer": "#98a3b3"
			}
		}
	},
	plugins: [],
};
