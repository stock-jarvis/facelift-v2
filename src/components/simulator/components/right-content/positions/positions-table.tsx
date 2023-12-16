import {
	Table,
	TableProps as AntdTableProps,
	Space,
	Button,
	Tooltip,
} from 'antd'
import { Dayjs } from 'dayjs'
import { RxExit, RxTrash } from 'react-icons/rx'
import { SaveOutlined } from '@ant-design/icons'

import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from 'src/common/utils/date-time-utils'

import { TradeAction } from 'src/common/enums'
import { positionsMockData } from './mock-data'

import TradeActionIndicator from 'src/common/components/trade-action-indicator'

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
			render: (tradeAction: TradeAction) => (
				<TradeActionIndicator tradeAction={tradeAction} />
			),
			width: 50,
			align: 'center',
		},
		{
			key: 'lots',
			title: 'Lots',
			dataIndex: 'lots',
			width: 100,
			align: 'center',
		},
		{
			key: 'entryDate',
			title: 'Entry Date',
			dataIndex: 'entryDate',
			render: (entryDate: Dayjs) => getDateAsStringFromDayjs(entryDate),
			width: 120,
			align: 'center',
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
			render: (entryTime: Dayjs) => getTimeAsStringFromDayjs(entryTime),
			width: 120,
			align: 'center',
		},
		{
			key: 'instrument',
			title: 'Instrument',
			dataIndex: 'instrument',
			align: 'center',
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
			render: (expiry: Dayjs) => getDateAsStringFromDayjs(expiry),
			width: 120,
			align: 'center',
		},
		{
			key: 'entryPrice',
			title: 'Entry Price',
			dataIndex: 'entryPrice',
			align: 'center',
		},
		{
			key: 'lastTradedPrice',
			title: 'Last Traded Price',
			dataIndex: 'lastTradedPrice',
			align: 'center',
		},
		{
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: () => (
				<Space size="large">
					<Tooltip title="Exit position">
						<Button size="large" type="text" shape="circle" icon={<RxExit />} />
					</Tooltip>
					<Tooltip title="Remove row">
						<Button
							size="large"
							type="text"
							shape="circle"
							icon={<RxTrash />}
						/>
					</Tooltip>
				</Space>
			),
			width: 150,
			align: 'center',
		},
	]

	return (
		<Table
			columns={columns}
			pagination={false}
			dataSource={positionsMockData}
			scroll={{ y: 'calc(100vh - 270px)' }}
			footer={() => (
				<Space>
					<Button type="primary" icon={<SaveOutlined />}>
						Saved Simulations
					</Button>
				</Space>
			)}
		/>
	)
}

export default PositionsTable
