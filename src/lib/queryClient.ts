import { QueryClient } from '@tanstack/react-query'

export const rootQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0,
		},
	},
})
