import { Table, TableProps, Space, Button, Tooltip } from 'antd'
import { Dayjs } from 'dayjs'
import { RxTrash } from 'react-icons/rx'
import {
	getDateAsStringFromDayjs,
	getTimeAsStringFromDayjs,
} from 'src/common/utils/date-time-utils'
import ExitLots from '../../exit-lots'
import {
	renderLotSizeNumberInput,
	renderTradeActionToggle,
} from 'src/common/utils/render-utils'
import { Position } from 'src/components/simulator/types'
import { useSimulatorPositionsStore } from 'src/components/simulator/store/simulator-positions-store'
import { useSimulatorParamsStore } from 'src/components/simulator/store/simulator-params-store'
import './style.css'
import { convertDDMMYYToDate } from 'src/common/utils/conversion-utils'

export type PositionsAntdTableProps = TableProps<Position>

type PositionsTableProps = {
	positions: Position[]
}

const PositionsTable: React.FC<PositionsTableProps> = ({ positions }) => {
	const { date, time } = useSimulatorParamsStore()
	const { removePosition, exitPosition, editPosition } =
		useSimulatorPositionsStore()

	const columns: PositionsAntdTableProps['columns'] = [
		{
			/** No title in table header */
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: (value, row) =>
				renderTradeActionToggle(value, (tradeAction) =>
					editPosition(row.id, { tradeAction })
				),
			width: 70,
			align: 'center',
		},
		{
			key: 'lots',
			title: 'Lots',
			dataIndex: 'lots',
			width: 100,
			align: 'center',
			render: (value, row) =>
				renderLotSizeNumberInput(value, (lots) =>
					editPosition(row.id, { lots: lots as number })
				),
		},
		{
			key: 'entryDate',
			title: 'Entry Date',
			dataIndex: 'entryDate',
			render: (entryDate: Dayjs) => getDateAsStringFromDayjs(entryDate),
			width: 160,
			align: 'center',
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
			render: (entryTime: Dayjs) => getTimeAsStringFromDayjs(entryTime),
			width: 160,
			align: 'center',
		},
		{
			key: 'strikePrice',
			title: 'Strike Price',
			dataIndex: 'strikePrice',
			align: 'center',
			width: 160,
			render: (strikePrice, record) => `${strikePrice} ${record.contractType}`,
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
			render: (expiry: number) => convertDDMMYYToDate(expiry),
			width: 160,
			align: 'center',
		},
		{
			key: 'entryPrice',
			title: 'Entry Price',
			dataIndex: 'entryPrice',
			align: 'center',
			width: 120,
		},
		{
			key: 'lastTradedPrice',
			title: 'Last Traded Price',
			dataIndex: 'lastTradedPrice',
			align: 'center',
			width: 120,
		},
		{
			key: 'exitDate',
			title: 'Exit date',
			dataIndex: 'exitDate',
			align: 'center',
			width: 120,
			render: (exit: Dayjs) => (exit ? getDateAsStringFromDayjs(exit) : '-'),
		},
		{
			key: 'exitTime',
			title: 'Exit time',
			dataIndex: 'exitTime',
			align: 'center',
			width: 120,
			render: (exit: Dayjs) => (exit ? getTimeAsStringFromDayjs(exit) : '-'),
		},
		{
			key: 'profitAndLoss',
			title: 'P&L',
			dataIndex: 'profitAndLoss',
			align: 'center',
			width: 120,
		},
		{
			key: 'tradeAction',
			dataIndex: 'tradeAction',
			render: (_, position) => {
				return (
					<Space size="large">
						{!position.exited ? (
							<ExitLots onExit={() => exitPosition(position.id, date, time)} />
						) : null}
						<Tooltip title="Remove row">
							<Button
								onClick={() => removePosition(position.id)}
								size="large"
								type="text"
								shape="circle"
								icon={<RxTrash />}
							/>
						</Tooltip>
					</Space>
				)
			},
			width: 150,
			align: 'center',
		},
	]

	return (
		<Table
			className="positions-table "
			rowClassName={(record) => {
				return record.exited ? 'exited-position-row' : ''
			}}
			columns={columns}
			pagination={false}
			dataSource={positions}
			scroll={{ y: 'calc(100vh - 635px)', x: 'auto' }}
			tableLayout="auto"
		/>
	)
}

export default PositionsTable
