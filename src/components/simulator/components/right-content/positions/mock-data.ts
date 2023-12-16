import { Dayjs } from 'dayjs'

import { Position } from './positions-table'
import { TradeAction } from 'src/components/simulator/enums'

export const positionsMockData: Position[] = [
	{
		tradeAction: TradeAction.Buy,
		lots: 1,
		entryDate: new Dayjs(),
		entryTime: new Dayjs(),
		instrument: '38300 CE',
		expiry: new Dayjs(),
		entryPrice: 500.0,
		lastTradedPrice: 450.0,
	},
]
