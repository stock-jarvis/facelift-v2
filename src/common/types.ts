import { Dayjs } from 'dayjs'
import { TriggerPointMetric } from './enums'

export type OptionsByExpiry = Record<string, Option[]>

export type Option = {
	strikePrice: number
	expiry: Dayjs

	/** CALL option Last Traded Price */
	ceLTP: number
	/** CALL option Last Traded Quantity */
	ceLTQ: number
	/** CALL option Open Interest */
	ceOI: number
	/**
	 * CALL option Last Traded Time
	 *
	 * Value exists only when Last Traded Time is different that the one selected by user.
	 */
	ceLTT?: Dayjs

	/** PUT option Last Traded Price*/
	peLTP: number
	/** PUT option Last Traded Quantity*/
	peLTQ: number
	/** PUT option Open Interest */
	peOI: number
	/**
	 * PUT option Last Traded Time
	 *
	 * Value exists only when Last Traded Time is different that the one selected by user.
	 */
	peLTT?: Dayjs
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

export type LoginUserRes = {
	Token: string
	Status: number
	UID: string
}
