import dayjs from 'dayjs'

import { Position } from './positions-table'
import { TradeAction } from 'src/common/enums'
import { range } from 'radash'

export const positionsMockData: Position[] = [...range(0, 20)].map((value) => ({
	tradeAction: value % 2 ? TradeAction.Buy : TradeAction.Sell,
	lots: 1,
	entryDate: dayjs(),
	entryTime: dayjs(),
	instrument: '38300 CE',
	expiry: dayjs(),
	entryPrice: 500.0 + value,
	lastTradedPrice: 450.0 + value,
}))
