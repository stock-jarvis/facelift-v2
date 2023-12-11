import { availableExchanges } from './constants'

export type Exchange = (typeof availableExchanges)[number]
