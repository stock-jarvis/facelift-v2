import { Table, TableProps, Typography } from 'antd'
import { Dayjs } from 'dayjs'
import { group } from 'radash'

import { OptionContractType, TradeAction } from 'src/common/enums'
import { positionsMockData } from '../mock-data'

import Footer from './footer'
import { useMemo } from 'react'
import PositionsTable from './positions-table'

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

export type InstrumentPositionsAntdTableProps = TableProps<{
	instrument: string
	positions: Position[] | undefined
	profitAndLoss: number
}>

const InstrumentPositionsTable = () => {
	const columns: InstrumentPositionsAntdTableProps['columns'] = [
		{
			title: 'Instrument',
			key: 'instrument',
			dataIndex: 'instrument',
		},
		{
			title: 'Profit and Loss',
			key: 'profitAndLoss',
			dataIndex: 'profitAndLoss',
			render: (profitAndLoss) => (
				<Typography.Text type="success">{profitAndLoss}</Typography.Text>
			),
		},
	]

	const dataSource = useMemo(
		() =>
			Object.entries(group(positionsMockData, (p) => p.instrument)).map(
				([instrument, positions]) => ({
					instrument,
					profitAndLoss: 1000,
					positions,
				})
			),
		[]
	)

	return (
		<Table
			rowKey="instrument"
			// showHeader={false}
			columns={columns}
			pagination={false}
			dataSource={dataSource}
			scroll={{ y: 'calc(100vh - 425px)' }}
			expandable={{
				expandedRowRender: (record) => (
					<PositionsTable positions={record.positions ?? []} />
				),
			}}
			footer={Footer}
		/>
	)
}

export default InstrumentPositionsTable
