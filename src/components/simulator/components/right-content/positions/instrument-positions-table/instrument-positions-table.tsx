import { Table, TableProps, Typography } from 'antd'
import { group } from 'radash'
import Footer from './footer'
import { useMemo } from 'react'
import PositionsTable from './positions-table/positions-table'
import { useSimulatorPositionsStore } from 'src/components/simulator/store/simulator-positions-store'
import { Position } from 'src/components/simulator/types'

export type InstrumentPositionsAntdTableProps = TableProps<{
	instrument: string
	positions: Position[] | undefined
	profitAndLoss: number
}>

const InstrumentPositionsTable = () => {
	const { positions } = useSimulatorPositionsStore()

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
			Object.entries(group(positions, (p) => p.instrument)).map(
				([instrument, positions]) => ({
					instrument,
					profitAndLoss: 1000,
					positions,
				})
			),
		[positions]
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
