/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		colors: {
			primary: "#1E40AF",
			white: "#FFFFFF",
			black: "#000000",
			red: "#F23030",
			"red-medium": "#f46060",
			"red-light": "#FEF2F3",
			"gray-1": "#F7F8FA",
			"light-text": "#8899A8",
			"primary-text": "#111928",
			stroke: "#DFE4EA",
		},
		screens: {
			sm: {max: "600px"},
			md: {max: "768px"},
		},
	},
	plugins: [],
};

