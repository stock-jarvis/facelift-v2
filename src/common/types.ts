import { Dayjs } from 'dayjs'
import { TriggerPointMetric } from './enums'

export type OptionsByExpiry = Record<string, Option[]>

export type Greeks = {
	/** Call Exercise */
	ceOpenInterest: number
	ceLastTradedQuantity: number
	/** Put Exercise */
	peOpenInterest: number
	peLastTradedQuantity: number
}

export type Option = {
	date: Dayjs
	strike: number
	greeks: Greeks
	/** Call Exercise */
	ceLastTradedTime?: Dayjs
	ceLastTradedPrice: number
	/** Put Exercise */
	peLastTradedTime?: Dayjs
	peLastTradedPrice: number
}

export type Future = {
	date: Dayjs
	openInterest: number
	lastTradedTime?: Dayjs
	lastTradedPrice: number
	lastTradedQuantity: number
}

export type TriggerPoint = {
	value: number
	metric: TriggerPointMetric
}

export type TimeByUnit = {
	hour: number
	minute: number
	second: number
}

export type TimeBoundary = {
	start: TimeByUnit
	end: TimeByUnit
}
/** Timestamp, Open, High, Low, Close */
export type OHLC = [number, number, number, number, number]
