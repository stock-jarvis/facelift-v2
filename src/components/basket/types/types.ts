import { exchangeType } from '../constants/data'

export type ExchangeType = (typeof exchangeType)[number]
export interface OptionObject {
	id: number
	value: string
	label: string
}

export interface IconActions {
	key: string
	icon: React.ReactNode
	toolTipLabel: string
	actionName: string
}
export interface TradeOptions {
	id: number
	label: string
	value: string
}

export interface RunTimeBasketData {
	key: string
	id: string
	name: string
	exchange: string
	instrument: string
	identifier: number
	error: boolean
	selected?: boolean
	positions?: BasketDataProps[]
}
export interface Date {
	day: string
	month: string
	string: string
}

export interface Time {
	label: string
	value: number
}

export interface TimeHours {
	label: string
	value: number
	minutes: Time[]
}

export interface PersistedValues {
	quantityValue: number
	actionValue: string
	optionType: string
	tradeOption: string
	subTradeOption: string
	tradeValue: number
	futureExpiryBaseValue: string
	optionExpiryBaseValue: string
}

export interface SavedBasketsEntryCondition {
	entryTime: string
	exitTime: string
}
export interface SavedBasketsExitCondition {
	type: string
	move?: boolean
	repeat?: string
	totalProfit: number
	totalLoss: number
}

export interface ProfitLossObject {
	value: number
	type: string
}

export interface PositionExitCondition {
	totalProfit: ProfitLossObject
	stopLoss: ProfitLossObject
}

export interface SavedBasketsObject {
	key: string
	id: string
	name?: string
	identifier: number
	exchange: string
	ticker: string
	type: string
	atm: string
	positions?: BasketDataProps[]
	entryCondition?: SavedBasketsEntryCondition
	exitCondition?: SavedBasketsExitCondition
}
export interface BasketDataProps {
	type: string
	id: string
	count: number
	entryCondition: {
		quantity: number
		actionType: string
		optionType?: string
		expiry?: string
		tradeType?: string
		tradeTypeParams?: string
		tradeTypeValue?: number
	}
	exitCondition: PositionExitCondition
}
