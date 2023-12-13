/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#2C9AFF',
				secondary: '#FFFFFF',
				textLight: '#FFFFFF',
				textDark: '#000000',
			},
		},
	},
	plugins: [],
}
