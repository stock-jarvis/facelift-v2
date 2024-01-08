import { Table, TableProps as AntdTableProps } from 'antd'
import { Dayjs } from 'dayjs'
import { ComparisonOperator, OptionType, TradeAction } from 'src/common/enums'
import { TriggerPoint } from 'src/common/types'
import { alertsMockData } from './mock-data'
import { formatDate } from 'src/common/utils/date-time-utils'
import { renderTradeAction } from 'src/common/utils/render-utils'

export type Jump = {
	tradeAction: TradeAction
	lots: number
	strike: {
		strikePrice: number
		type: OptionType
	}
	expiry: Dayjs
	entryPrice: number
	lastTradedPrice: number
	stopLoss?: TriggerPoint
	targetProfit?: TriggerPoint
	comparisonOperator?: ComparisonOperator
	instrumentPrice: number
}

type TableProps = AntdTableProps<Jump>

// TODO: Wire up
const JumpTable = () => {
	const columns: TableProps['columns'] = [
		{
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: renderTradeAction,
		},
		{
			key: 'lots',
			title: 'Lots',
			dataIndex: 'lots',
		},
		{
			key: 'strike',
			title: 'Strike',
			dataIndex: 'strike',
			// TODO: Implement after Option type is confirmed
			render: () => <div>TBI</div>,
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
			render: (expiry) => formatDate(expiry),
		},
		{
			key: 'entryPrice',
			title: 'Entry Price',
			dataIndex: 'entryPrice',
		},
		{
			key: 'lastTradedPrice',
			title: 'Last Traded Price',
			dataIndex: 'lastTradedPrice',
		},
		{
			key: 'stopLoss',
			title: 'Stop Loss',
			dataIndex: 'stopLoss',
			// TODO: Implement after Option type is confirmed
			render: () => <div>TBI</div>,
		},
		{
			key: 'targetProfit',
			title: 'Target Profit',
			dataIndex: 'targetProfit',
			// TODO: Implement after Option type is confirmed
			render: () => <div>TBI</div>,
		},
		{
			key: 'comparisonOperator',
			title: 'Comparison Operator',
			dataIndex: 'comparisonOperator',
		},
		{
			key: 'instrumentPrice',
			title: 'Instrument Price',
			dataIndex: 'instrumentPrice',
		},
	]

	return (
		<Table
			pagination={false}
			columns={columns}
			dataSource={alertsMockData}
			scroll={{ y: 'calc(100vh - 450px)' }}
		/>
	)
}

export default JumpTable
