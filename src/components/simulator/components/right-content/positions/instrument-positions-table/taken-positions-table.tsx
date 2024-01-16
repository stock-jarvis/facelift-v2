import { Table, TableProps, Space, Button, Tooltip } from 'antd'
import { Dayjs } from 'dayjs'
import { RxTrash } from 'react-icons/rx'

import {
	convertDateFromServer,
	formatDate,
	formatTime,
} from 'src/common/utils/date-time-utils'

import ExitLots from '../exit-lots'
import { renderTradeAction } from 'src/common/utils/render-utils'
import { TakenPosition } from 'src/common/types'
import { ButtonProps } from 'src/common/components/button/button'
import { useTakenPositionsStore } from 'src/components/simulator/store/taken-positions-store'

export type TakenPositionsAntdTableProps = TableProps<TakenPosition>

type TakenPositionsTableProps = {
	positions: TakenPosition[]
}

const TakenPositionsTable: React.FC<TakenPositionsTableProps> = ({
	positions,
}) => {
	const { removeTakenPosition } = useTakenPositionsStore()

	const columns: TakenPositionsAntdTableProps['columns'] = [
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
			render: (entryDate: Dayjs) => formatDate(entryDate),
			width: 120,
			align: 'center',
		},
		{
			key: 'entryTime',
			title: 'Entry Time',
			dataIndex: 'entryTime',
			render: (entryTime: Dayjs) => formatTime(entryTime),
			width: 120,
			align: 'center',
		},
		{
			key: 'strike',
			title: 'Strike Price',
			dataIndex: 'strike',
			align: 'center',
			render: (strikePrice, record) => `${strikePrice} ${record.contractType}`,
		},
		{
			key: 'expiry',
			title: 'Expiry',
			dataIndex: 'expiry',
			render: (expiry: string) => formatDate(convertDateFromServer(expiry)),
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
			key: 'id',
			dataIndex: 'id',
			render: (id) => (
				<Space size="large">
					{/* // TODO: Wire up lots */}
					<ExitLots />
					<Tooltip title="Remove row">
						<Button
							size="large"
							type="text"
							shape="circle"
							icon={<RxTrash />}
							data-id={id}
							onClick={handleRemovePosition}
						/>
					</Tooltip>
				</Space>
			),
			width: 150,
			align: 'center',
		},
	]

	const handleRemovePosition: ButtonProps['onClick'] = (event) => {
		const id = event.currentTarget.dataset.id!
		removeTakenPosition(id)
	}

	return (
		<Table
			columns={columns}
			pagination={false}
			dataSource={positions}
			scroll={{ y: 'calc(100vh - 635px)' }}
		/>
	)
}

export default TakenPositionsTable
