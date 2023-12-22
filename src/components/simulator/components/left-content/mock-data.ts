import { range } from 'radash'

export const mockFutures = [...range(0, 900, (i) => i, 100)].map(
	(i) => 32800 + i
)
