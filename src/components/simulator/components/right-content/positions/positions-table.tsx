import { Table, TableProps as AntdTableProps } from 'antd'
import { Dayjs } from 'dayjs'
import { TradeAction } from 'src/components/simulator/enums'

export type Position = {
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	expiry: Dayjs
	entryPrice: number
	lastTradedPrice: number
	// TODO: Check data type from API
	// profitAndLoss: {
	// 	amount: number
	// 	percentage: number
	// }
}

type TableProps = AntdTableProps<Position>

const PositionsTable = () => {
	const columns: TableProps['columns'] = [
		{
			/** No title in table header */
			key: 'tradeAction',
			dataIndex: 'tradeAction',
		},
		{
			key: 'lots',
			title: 'Lots',
			dataIndex: 'lots',
		},
		{
			key: 'entryDate',
			title: 'Entry Date',
			dataIndex: 'entryDate',
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
		},
		{
			key: 'instrument',
			title: 'Instrument',
			dataIndex: 'instrument',
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
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
	]

	return (
		<Table className="w-full h-full" sticky={true} scroll={{ y: '100%' }} />
	)
}

export default PositionsTable
