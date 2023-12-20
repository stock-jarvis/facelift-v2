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

export interface OptionsBasket {
	qunatity: number
	type: string
	id: string
	stop_loss_value: number
	total_profit_value: number
	stop_loss_type: string
	total_profit_type: string
	action_type: string
	option_type: string
	expiry: string
	trade_type: string
	trade_type_params: string
	trade_type_value: number
}

export interface RunTimeBasketData {
	id: string
	name: string
	exchange: string
	instrument: string
	identifier: number
	error: boolean
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
	entry_time: string
	exit_time: string
}
export interface SavedBasketsExitCondition {
	type: string
	move?: boolean
	repeat?: string
	total_profit: number
	total_loss: number
}

export interface ProfitLossObject {
	value: number
	type: string
}
export interface PositionEntryCondition {
	quantity: number
	position_type: string
	action_type: string
	expiry: string
	option_type: string
	trade_type: string
	trade_type_params: string
	trade_type_value: number
}
export interface PositionExitCondition {
	total_profit: ProfitLossObject
	stop_loss: ProfitLossObject
}
export interface PositionsObject {
	id: string
	entry_condition: PositionEntryCondition
	exit_condition: PositionExitCondition
}
export interface SavedBasketsObject {
	id: string
	name?: string
	identifier?: number
	exchange: string
	ticker: string
	type: string
	atm: string
	positions?: BasketDataProps[]
	entry_condition?: SavedBasketsEntryCondition
	exit_condition?: SavedBasketsExitCondition
}
export interface BasketDataProps {
	type: string
	id: string
	entry_condition: {
		quantity: number
		action_type: string
		option_type?: string
		expiry?: string
		trade_type?: string
		trade_type_params?: string
		trade_type_value?: number
	}
	exit_condition: PositionExitCondition
}
