import { Table, TableProps as AntdTableProps } from 'antd'
import { Dayjs } from 'dayjs'
import { TradeAction } from 'src/common/enums'
import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from 'src/common/utils/date-time-utils'
import { greekMockData } from './mock-data'
import { renderTradeAction } from 'src/common/utils/render-utils'

export type Greek = {
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	expiry: Dayjs
	impliedVolatility: number
	delta: number
	theta: number
	gamma: number
	vega: number
}

export type TableProps = AntdTableProps<Greek>

const GreeksTable = () => {
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
			key: 'entryDate',
			title: 'Entry Date',
			dataIndex: 'entryDate',
			render: (entryDate) => getDateAsStringFromDayjs(entryDate),
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
			render: (entryTime) => getTimeAsStringFromDayjs(entryTime),
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
			key: 'impliedVolatility',
			title: 'IV',
			dataIndex: 'impliedVolatility',
		},
		{
			key: 'delta',
			title: 'Delta',
			dataIndex: 'delta',
		},
		{
			key: 'theta',
			title: 'Theta',
			dataIndex: 'theta',
		},
		{
			key: 'gamma',
			title: 'Gamma',
			dataIndex: 'gamma',
		},
		{
			key: 'vega',
			title: 'Vega',
			dataIndex: 'vega',
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={greekMockData}
			pagination={false}
			scroll={{ y: 'calc(100vh - 220px)' }}
		/>
	)
}

export default GreeksTable
