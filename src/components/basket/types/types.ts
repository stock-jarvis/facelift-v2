import { exchangeType } from '../constants/data'

export type ExchangeType = (typeof exchangeType)[number]
export interface OptionObject {
	id: number
	value: string
	label: string
}

export interface TradeOptions {
	id: number
	label: string
	value: string
}
