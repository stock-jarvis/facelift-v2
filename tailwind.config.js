/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [],

	/**
	 * Disabling the preflight reset of Tailwind as it conflicts with antd component styles.
	 * https://www.youtube.com/watch?v=oG6XPy1t1KA
	 */
	corePlugins: {
		preflight: false,
	},
}
