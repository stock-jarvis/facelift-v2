import dayjs from 'dayjs'

import { OptionContractType, TradeAction } from 'src/common/enums'
import { range } from 'radash'
import { Position } from './instrument-positions-table/instrument-positions-table'

export const positionsMockData: Position[] = [...range(0, 20)].map((value) => ({
	tradeAction: value % 2 ? TradeAction.Buy : TradeAction.Sell,
	lots: 1,
	entryDate: dayjs(),
	entryTime: dayjs(),
	strikePrice: 38300 + value,
	contractType: value % 2 === 0 ? OptionContractType.PE : OptionContractType.CE,
	instrument: value % 2 === 0 ? 'Jindal Steel' : 'Asian Paints',
	expiry: dayjs(),
	entryPrice: 500.0 + value,
	lastTradedPrice: 450.0 + value,
}))
