import { Table as AntdTable, TableProps as AntdTableProps } from 'antd'
import { range } from 'radash'
import { useMemo } from 'react'
import { DerivativesMetric } from 'src/common/enums'

// Dev
const mockData = [...range(0, 2000, (i) => i, 100)].map((value) => ({
	id: value,
	call: 100 + value,
	iv1: '',
	strike: 38000 + value,
	iv2: '',
	put: 900 - value,
}))

type OptionStrikeTableData = {
	call: number
	iv1: string
	strike: number
	iv2: string
	put: number
}

const Table = AntdTable<OptionStrikeTableData>
type TableProps = AntdTableProps<OptionStrikeTableData>

type DerivativesTableProps = {
	selectedDerivativeMetric?: DerivativesMetric
}

const DerivativesTable: React.FC<DerivativesTableProps> = ({
	selectedDerivativeMetric,
}) => {
	const dataSource: TableProps['dataSource'] = useMemo(() => mockData, [])

	const columns: TableProps['columns'] = useMemo(() => {
		const columnsBuilder: TableProps['columns'] = []

		columnsBuilder.push({
			key: 'call',
			title: 'CALL',
			dataIndex: 'call',
			width: 24,
			align: 'center',
		})

		if (selectedDerivativeMetric) {
			columnsBuilder.push({
				key: 'ce' + selectedDerivativeMetric,
				title: selectedDerivativeMetric,
				dataIndex: 'ce' + selectedDerivativeMetric,
				width: 12,
				align: 'center',
			})
		}

		columnsBuilder.push({
			key: 'strike',
			title: 'Strike',
			dataIndex: 'strike',
			width: 26,
			align: 'center',
		})

		if (selectedDerivativeMetric) {
			columnsBuilder.push({
				key: 'pe' + selectedDerivativeMetric,
				title: selectedDerivativeMetric,
				dataIndex: 'pe' + selectedDerivativeMetric,
				width: 12,
				align: 'center',
			})
		}

		columnsBuilder.push({
			key: 'put',
			title: 'PUT',
			dataIndex: 'put',
			width: 24,
			align: 'center',
		})

		return columnsBuilder
	}, [selectedDerivativeMetric])

	return (
		// TODO: Implement Date selection component
		<Table
			/**
			 * selectedDerivativeMetric causes the columns to change,
			 * so using it as key destroys and recreates the table.
			 */
			key={selectedDerivativeMetric}
			rowKey="id"
			// TODO: Fix virtual
			// TODO: Handle loading
			loading={false}
			dataSource={dataSource}
			columns={columns}
			pagination={false}
			scroll={{
				y: 'calc(100vh - 380px)',
			}}
		/>
	)
}

export default DerivativesTable
