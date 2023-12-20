import dayjs from 'dayjs'

import { TradeAction } from 'src/common/enums'
import { range } from 'radash'
import { Greek } from './greeks-table'

export const greekMockData: Greek[] = [...range(0, 20)].map((value) => ({
	tradeAction: value % 2 ? TradeAction.Buy : TradeAction.Sell,
	lots: 1,
	entryDate: dayjs(),
	entryTime: dayjs(),
	instrument: '38300 CE',
	expiry: dayjs(),
	impliedVolatility: -33.51 - value,
	delta: -0.51 - value,
	theta: -137 - value,
	gamma: 0.00051,
	vega: 4.2,
}))
