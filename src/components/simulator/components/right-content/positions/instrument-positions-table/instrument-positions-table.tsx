import { Table, TableProps } from 'antd'
import { group } from 'radash'

import Footer from './footer'
import { useMemo } from 'react'
import TakenPositionsTable from './taken-positions-table'
import { useTakenPositionsStore } from 'src/components/simulator/store/taken-positions-store'
import { TakenPosition } from 'src/common/types'
import { ProfitLoss } from 'src/common/components'

export type InstrumentPositionsAntdTableProps = TableProps<{
	instrument: string
	positions: TakenPosition[] | undefined
	profitAndLoss: number
}>

const InstrumentPositionsTable = () => {
	const { takenPositions } = useTakenPositionsStore()

	const dataSource = useMemo(() => {
		const positionsByInstrument = group(
			takenPositions,
			(takenPosition) => takenPosition.instrument
		)

		return Object.entries(positionsByInstrument).map(
			([instrument, positions]) => ({
				instrument,
				positions,
				// TODO: Wire Up
				profitAndLoss: 100,
			})
		)
	}, [takenPositions])

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
			render: (profitAndLoss) => <ProfitLoss value={profitAndLoss} />,
		},
	]

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
					<TakenPositionsTable positions={record.positions ?? []} />
				),
			}}
			footer={Footer}
		/>
	)
}

export default InstrumentPositionsTable
