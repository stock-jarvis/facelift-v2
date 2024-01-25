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
	quantityValue: number
	instrument: string
	actionValue: TradeAction
	expiry?: string
	optionType?: OptionType
	tradeValue?: number
	tradeOption: string
	subTradeOption?: string
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
	expiry: string
	stopLossValue: number
	quantityValue: number
	stopLossType: YeildType
	totalProfitValue: number
	actionValue: TradeAction
	totalProfitType: YeildType
}

export interface OptionsBasketData {
	expiry: string
	tradeValue: number
	tradeOption: string
	quantityValue: number
	stopLossValue: number
	subTradeOption: string
	optionType: OptionType
	stopLossType: YeildType
	actionValue: TradeAction
	totalProfitValue: number
	totalProfitType: YeildType
	subTradeOptionList: DefaultOptionType[]
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
