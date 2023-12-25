import dayjs from 'dayjs'

import {
	ComparisonOperator,
	OptionType,
	TradeAction,
	TriggerPointMetric,
} from 'src/common/enums'
import { range } from 'radash'
import { Jump } from './jump-table'

export const alertsMockData: Jump[] = [...range(0, 20)].map((value) => ({
	tradeAction: value % 2 ? TradeAction.Buy : TradeAction.Sell,
	lots: 1,
	entryDate: dayjs(),
	entryTime: dayjs(),
	strike: {
		strikePrice: 10000 + value,
		type: OptionType.PUT,
	},
	expiry: dayjs(),
	entryPrice: 100 + value,
	lastTradedPrice: 200 + value,
	stopLoss: {
		metric: TriggerPointMetric.Percentage,
		value: 10,
	},
	targetProfit: {
		metric: TriggerPointMetric.Percentage,
		value: 20,
	},
	comparisonOperator: ComparisonOperator.GreaterThan,
	instrumentPrice: 300,
}))
