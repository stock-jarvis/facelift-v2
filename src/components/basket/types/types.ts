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
export interface BasketDataProps {
	qunatity: number
	type: string
	id: string
	stop_loss_value: number
	total_profit_value: number
	stop_loss_type: string
	total_profit_type: string
	action_type: string
	option_type?: string
	expiry?: string
	trade_type?: string
	trade_type_params?: string
	trade_type_value?: number
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

export interface Time {
	label: string
	value: number
}

export interface TimeHours {
	label: string
	value: number
	minutes: Time[]
}
