import { Table, TableProps, Space, Button, Tooltip } from 'antd'
import { Dayjs } from 'dayjs'
import { RxTrash } from 'react-icons/rx'

import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from 'src/common/utils/date-time-utils'

import { OptionContractType, TradeAction } from 'src/common/enums'

import Footer from './footer'
import ExitLots from '../exit-lots'
import { renderTradeAction } from 'src/common/utils/render-utils'

export type Position = {
	tradeAction: TradeAction
	lots: number
	entryDate: Dayjs
	entryTime: Dayjs
	instrument: string
	strikePrice: number
	contractType: OptionContractType
	expiry: Dayjs
	entryPrice: number
	lastTradedPrice: number
	// TODO: Check data type from API
	// profitAndLoss: {
	// 	amount: number
	// 	percentage: number
	// }
}

export type PositionsAntdTableProps = TableProps<Position>

type PositionsTableProps = {
	positions: Position[]
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
	const columns: PositionsAntdTableProps['columns'] = [
		{
			/** No title in table header */
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: renderTradeAction,
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
			key: 'strikePrice',
			title: 'Strike Price',
			dataIndex: 'strikePrice',
			align: 'center',
			render: (strikePrice, record) => `${strikePrice} ${record.contractType}`,
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
					{/* // TODO: Wire up lots */}
					<ExitLots />
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
			dataSource={positions}
			scroll={{ y: 'calc(100vh - 635px)' }}
		/>
	)
}

export default PositionsTable
