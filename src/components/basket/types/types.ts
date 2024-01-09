import { DefaultOptionType } from 'antd/es/select'
import { Dayjs } from 'dayjs'
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

export enum YeildType {
	PERCENT = 'percent',
	POINTS = 'points',
	RUPEES = 'rupees',
}

export interface SavedBasketsEntryCondition {
	entryTime: Dayjs
	exitTime: Dayjs
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
	type: YeildType
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
export interface SavedPosition {
	id: string
	quantity: number
	action: TradeAction
	expiry?: string
	option?: OptionType
	tradeValue?: number
	tradeOption: string
	subTradeOption?: string
	instrument: string
	subTradeOptionList?: DefaultOptionType[]
}

export interface SpotBasketData {
	quantityValue: number
	actionValue: TradeAction
	totalProfitType: YeildType
	stopLossType: YeildType
	totalProfitValue: number
	stopLossValue: number
}

export interface FutureBasketData {
	quantityValue: number
	actionValue: TradeAction
	totalProfitType: YeildType
	stopLossType: YeildType
	expiry: string | undefined
	totalProfitValue: number
	stopLossValue: number
}

export interface OptionsBasketData {
	quantityValue: number
	actionValue: TradeAction
	totalProfitType: YeildType
	optionType: OptionType
	stopLossType: YeildType
	expiry: string | undefined
	totalProfitValue: number
	stopLossValue: number
	tradeOption: string | undefined
	subTradeOption: string | undefined
	tradeValue: number | undefined
	subTradeOptionList: DefaultOptionType[] | undefined
}

export enum OptionsKey {
	ACTION = 'actionValue',
	OPTION = 'optionType',
	EXPIRY = 'expiry',
	LOSSTYPE = 'stopLossType',
	LOSSVALUE = 'stopLossValue',
	PROFITTYPE = 'totalProfitType',
	PROFITVALUE = 'totalProfitValue',
	QUANTITY = 'quantityValue',
	TRADEVALUE = 'tradeValue',
	SUBTRADEOPTION = 'subTradeOption',
}

export enum SpotKey {
	ACTION = 'actionValue',
	LOSSTYPE = 'stopLossType',
	LOSSVALUE = 'stopLossValue',
	PROFITTYPE = 'totalProfitType',
	PROFITVALUE = 'totalProfitValue',
	QUANTITY = 'quantityValue',
}

export enum FutureKey {
	ACTION = 'actionValue',
	EXPIRY = 'expiry',
	LOSSTYPE = 'stopLossType',
	LOSSVALUE = 'stopLossValue',
	PROFITTYPE = 'totalProfitType',
	PROFITVALUE = 'totalProfitValue',
	QUANTITY = 'quantityValue',
}
export enum YeildLabel {
	LOSS = 'SL',
	PROFIT = 'TP',
}
