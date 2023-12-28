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
	expiry: string
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
	exitCondition: SavedBasketsExitCondition
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
export interface BasketDataValues {
	id: string
	quantity: number
	action: string
	expiry?: string
	option?: string
	tradeValue?: number
	tradeOption: string
	subTradeOption?: string
	instrument: string
	subTradeOptionList?: OptionObject[]
}

export interface SpotBasketData {
	quantityValue: number
	actionValue: string
	totalProfitType: string
	stopLossType: string
	totalProfitValue: number
	stopLossValue: number
}

export interface FututreDetailsProps {
	dark: boolean
	individualBasket: BasketDataProps
	baseInstrumentValue: string
	basket: BasketDataProps[]
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}

export interface FutureBasketData {
	quantityValue: number
	actionValue: string
	totalProfitType: string
	stopLossType: string
	expiry: string | undefined
	totalProfitValue: number
	stopLossValue: number
}

export type futureStrKeys =
	| 'actionValue'
	| 'expiry'
	| 'stopLossType'
	| 'totalProfitType'
export type futureNumberedKeys =
	| 'quantityValue'
	| 'totalProfitValue'
	| 'stopLossValue'

export interface SpotDetailsProps {
	dark: boolean
	basket: BasketDataProps[]
	baseInstrumentValue: string
	individualBasket: BasketDataProps
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}

export type spotStrKeys = 'actionValue' | 'stopLossType' | 'totalProfitType'
export type spotNumberedKeys =
	| 'quantityValue'
	| 'totalProfitValue'
	| 'stopLossValue'

export interface OptionDetailsProps {
	individualBasket: BasketDataProps
	dark: boolean
	basket: BasketDataProps[]
	baseInstrumentValue: string
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
export interface OptionsBasketData {
	quantityValue: number
	actionValue: string
	totalProfitType: string
	optionType: string | undefined
	stopLossType: string
	expiry: string | undefined
	totalProfitValue: number
	stopLossValue: number
	tradeOption: string | undefined
	subTradeOption: string | undefined
	tradeValue: number | undefined
	subTradeOptionList: TradeOptions[] | undefined
}

export type optionsStrKeys =
	| 'actionValue'
	| 'optionType'
	| 'expiry'
	| 'stopLossType'
	| 'totalProfitType'
	| 'subTradeOption'
export type optionNumberedKeys =
	| 'quantityValue'
	| 'totalProfitValue'
	| 'stopLossValue'
	| 'tradeValue'
