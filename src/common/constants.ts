import { Exchange } from './enums'
import { TimeBoundary } from './types'

export const timeBoundariesByExchange: Record<Exchange, TimeBoundary> = {
	[Exchange.CUR]: {
		start: {
			hour: 9,
			minute: 0,
			second: 0,
		},
		end: {
			hour: 17,
			minute: 0,
			second: 0,
		},
	},
	[Exchange.MCX]: {
		start: {
			hour: 9,
			minute: 0,
			second: 0,
		},
		end: {
			hour: 23,
			minute: 55,
			second: 0,
		},
	},
	[Exchange.NSE]: {
		start: {
			hour: 9,
			minute: 0,
			second: 0,
		},
		end: {
			hour: 15,
			minute: 30,
			second: 0,
		},
	},
}

export const BANK_NIFTY_TICKER = 'NIFTY BANK' as const

export const MAX_INSTRUMENTS_ALLOWED = 3
