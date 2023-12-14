export const availableExchanges = ['NSE', 'MCX', 'CUR'] as const

export const BANK_NIFTY_TICKER = 'NIFTY BANK' as const

export const MAX_INSTRUMENTS_ALLOWED = 3

export const availableDerivativesMetrics = [
	'OI' /** Open Interest */,
	'IV' /** Implied Volatility */,
	'Delta',
] as const
