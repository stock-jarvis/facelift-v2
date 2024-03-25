import { Dayjs } from 'dayjs'
import { Exchange } from 'src/common/enums'

export interface SpotDataReq {
	exc: Exchange
	inst: string

	// date should be in format DD-MM-YYYY
	date: Dayjs

	// time should be in HH:mm:ss format
	time: Dayjs
}

export interface SpotDataRes {
	// Prev day close
	PDC: number

	// Day Open
	DO: number

	// Spot price
	Open: number
}

// Record<unix timestamp, lot size>
export type LotSizeRes = { lotsizes: Record<number, number> }

export interface AIOCReq {
	exc: Exchange
	inst: string

	// send in format 'DD-MM-YYYY'
	date: Dayjs

	// send in format 'HH:mm:ss'
	time: Dayjs

	part?: number
	exps: Array<number>
}

export interface AIOCRes {
	// format 'DDMMYY'
	expList: Array<number>

	// key is of format 'DDMMYY'
	OptionChain: Record<string, { OptionChain: Array<AIOSOptionChain> }>

	Futures: Record<string, AIOSFutures>
}

export interface AIOSOptionChain {
	strike: number
	celtp: number
	peltp: number
	celtt: number
	peltt: number
	greeks: {
		celtq: number
		ceoi: number
		peltq: number
		peoi: number
	}
}
export interface AIOSFutures {
	ltp: number
	ltq: number
	oi: number
	ltt: number
}
