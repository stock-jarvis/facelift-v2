import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	envPrefix: 'STOCKJARVIS',
	resolve: {
		alias: {
			src: '/src',
			api: '/src/api',
			common: '/src/common',
		},
	},
})
