import {
	Exchange,
	OptionType,
	TradeAction,
	BasketType,
	BasketAtm,
	BasketExitType,
	BasketLegType,
} from 'src/common/enums'

export enum RepeatType {
	CONDITION = 'Condition',
	TRADE = 'Trade',
	NA = 'NA',
}

export enum EditType {
	RUNTIME = 'runtime',
	SAVED = 'saved',
	NILL = '',
}
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

export interface SavedBasketsEntryCondition {
	entryTime: string
	exitTime: string
}
export interface SavedBasketsExitCondition {
	type: BasketExitType
	move?: boolean
	repeat?: RepeatType
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

export interface SavedBasket {
	id: string
	name?: string
	error?: boolean
	identifier: number
	exchange: Exchange
	ticker: string
	type: BasketType
	atm: BasketAtm
	positions?: BasketDataProps[]
	entryCondition?: SavedBasketsEntryCondition
	exitCondition: SavedBasketsExitCondition
}
export interface PositionEntryCondition {
	quantity: number
	actionType: TradeAction
	optionType?: OptionType
	expiry?: string
	tradeType?: string
	tradeTypeParams?: string
	tradeTypeValue?: number
}
export interface BasketDataProps {
	type: BasketLegType
	id: string
	count: number
	entryCondition: PositionEntryCondition
	exitCondition: PositionExitCondition
}
export interface BasketDataValues {
	id: string
	quantity: number
	action: TradeAction
	expiry?: string
	option?: OptionType
	tradeValue?: number
	tradeOption: string
	subTradeOption?: string
	instrument: string
	subTradeOptionList?: OptionObject[]
}

export interface SpotBasketData {
	quantityValue: number
	actionValue: TradeAction
	totalProfitType: string
	stopLossType: string
	totalProfitValue: number
	stopLossValue: number
}

export interface FutureBasketData {
	quantityValue: number
	actionValue: TradeAction
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

export type spotStrKeys = 'actionValue' | 'stopLossType' | 'totalProfitType'
export type spotNumberedKeys =
	| 'quantityValue'
	| 'totalProfitValue'
	| 'stopLossValue'

export interface OptionsBasketData {
	quantityValue: number
	actionValue: TradeAction
	totalProfitType: string
	optionType: OptionType
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
