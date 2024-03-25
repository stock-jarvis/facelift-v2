import dayjs, { Dayjs } from 'dayjs'
import TradeActionIndicator from '../components/trade-action-indicator'
import { TradeAction } from '../enums'
import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from './date-time-utils'
import utc from 'dayjs/plugin/utc'
import TradeActionToggle from '../components/trade-action-toggle'
import { InputNumber, InputNumberProps } from 'antd'
dayjs.extend(utc)

export const renderTradeActionToggle = (
	tradeAction: TradeAction,
	toggle: (tradeAction: TradeAction) => void
) => <TradeActionToggle tradeAction={tradeAction} toggle={toggle} />

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
		<sub
			style={{
				fontSize: '8px',
				color: '#1677ff',
				marginLeft: '8px',
				position: 'absolute',
				right: 10,
				bottom: 2,
			}}
		>
			{dayjs(lastTraded * 1000)
				.utc()
				.format('HH:mm:ss')}
		</sub>
	)
}

export const renderLotSizeNumberInput = (
	size: number,
	onChange: InputNumberProps['onChange']
) => (
	<InputNumber
		size="small"
		style={{ width: '90px' }}
		min={1}
		value={size}
		onChange={onChange}
	/>
)
