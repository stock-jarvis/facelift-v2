import { availableDerivativesMetrics, availableExchanges } from './constants'

export type Exchange = (typeof availableExchanges)[number]

export type DerivativesMetric = (typeof availableDerivativesMetrics)[number]

export type TradeAction = 'B' /** Buy */ | 'S' /** Sell */
