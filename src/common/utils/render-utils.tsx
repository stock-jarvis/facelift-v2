import { Dayjs } from 'dayjs'
import TradeActionIndicator from '../components/trade-action-indicator'
import { TradeAction } from '../enums'
import { formatDate, formatTime } from './date-time-utils'

export const renderTradeAction = (tradeAction: TradeAction) => (
	<TradeActionIndicator tradeAction={tradeAction} />
)

export const renderDayjsDate = (dayjsDate: Dayjs) => formatDate(dayjsDate)

export const renderDayjsTime = (dayjsTime: Dayjs) => formatTime(dayjsTime)
