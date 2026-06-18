module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				yekan: ["YekanBakh"],
				yekanBold: ["YekanBakhBold"],
			},
			colors: {
				primary: '#1E5A99',
				primaryLight: '#dbeaff'
			},
		},
	},
	plugins: [],
};