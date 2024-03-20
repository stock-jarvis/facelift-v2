import dayjs, { Dayjs } from 'dayjs'
import TradeActionIndicator from '../components/trade-action-indicator'
import { TradeAction } from '../enums'
import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from './date-time-utils'

export const renderTradeAction = (tradeAction: TradeAction) => (
	<TradeActionIndicator tradeAction={tradeAction} />
)

export const renderDayjsDate = (dayjsDate: Dayjs) =>
	getDateAsStringFromDayjs(dayjsDate)

export const renderDayjsTime = (dayjsTime: Dayjs) =>
	getTimeAsStringFromDayjs(dayjsTime)

export const renderPriceWithLastTradedTime = (lastTraded: number) => {
	if (lastTraded === -1) return null

	return (
		<sub style={{ fontSize: '8px' }}>
			{dayjs(lastTraded * 1000).format('HH:mm')}
		</sub>
	)
}
