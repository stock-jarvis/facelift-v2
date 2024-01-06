import dayjs from 'dayjs'

import { TradeAction } from 'src/common/enums'
import { range } from 'radash'
import { SavedSimulationTrade } from './saved-simulations-modal'

export const savedSimulationMockData: SavedSimulationTrade[] = [
	...range(0, 4),
].map((value) => ({
	tradeAction: value % 2 ? TradeAction.Buy : TradeAction.Sell,
	lots: 1,
	entryDate: dayjs(),
	entryTime: dayjs(),
	instrument: '38300 CE',
	expiry: dayjs(),
	entryPrice: 500.0 + value,
	lastTradedPrice: 450.0 + value,
	exitPrice: 600 + value,
	profitAndLoss: 100,
}))
