import { Dayjs } from 'dayjs'
import { TradeAction, OptionContractType } from 'src/common/enums'

export type Position = {
	id: string
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	strikePrice: number
	contractType: OptionContractType
	expiry: number
	entryPrice: number
	lastTradedPrice: number
	profitAndLoss: number
	exited: boolean
	exitDate?: Dayjs
	exitTime?: Dayjs
}
