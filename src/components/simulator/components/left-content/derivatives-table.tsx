import { Table as AntdTable, TableProps as AntdTableProps, theme } from 'antd'
import { range } from 'radash'
import { useMemo } from 'react'
import { DerivativesMetric } from 'src/common/enums'
import { findClosest } from 'src/common/utils/find-utils'

// Dev
const mockData = [...range(0, 2000, (i) => i, 100)].map((value) => ({
	id: value,
	call: 100 + value,
	iv1: '',
	strike: 38000 + value,
	iv2: '',
	put: 900 - value,
}))

type DerivativesTableDataSource = {
	call: number
	iv1: string
	strike: number
	iv2: string
	put: number
}

const Table = AntdTable<DerivativesTableDataSource>
type TableProps = AntdTableProps<DerivativesTableDataSource>

type DerivativesTableProps = {
	selectedDerivativeMetric?: DerivativesMetric
}

const DerivativesTable: React.FC<DerivativesTableProps> = ({
	selectedDerivativeMetric,
}) => {
	const { token } = theme.useToken()

	const spotPrice = 39250

	const strikePriceClosestToSpotPrice = useMemo(
		() =>
			findClosest(
				mockData.map((data) => data.strike),
				spotPrice
			),
		[spotPrice]
	)

	const dataSource: TableProps['dataSource'] = useMemo(() => mockData, [])

	const columns: TableProps['columns'] = useMemo(() => {
		const columnsBuilder: TableProps['columns'] = []

		columnsBuilder.push({
			key: 'call',
			title: 'CALL',
			dataIndex: 'call',
			width: 24,
			align: 'center',
			onCell: (derivativeData) => ({
				style: {
					backgroundColor:
						strikePriceClosestToSpotPrice &&
						derivativeData.strike < strikePriceClosestToSpotPrice
							? token.controlItemBgActiveHover
							: undefined,
				},
			}),
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
			onCell: (derivativeData) => ({
				style: {
					backgroundColor:
						strikePriceClosestToSpotPrice &&
						derivativeData.strike > strikePriceClosestToSpotPrice
							? token.controlItemBgActiveHover
							: undefined,
				},
			}),
		})

		return columnsBuilder
	}, [selectedDerivativeMetric, strikePriceClosestToSpotPrice])

	return (
		// TODO: Implement Date selection component
		<Table
			/**
			 * selectedDerivativeMetric causes the columns to change,
			 * so using it as key destroys and recreates the table.
			 */
			key={selectedDerivativeMetric}
			size="small"
			rowKey="id"
			// TODO: Fix virtual
			// TODO: Handle loading
			loading={false}
			dataSource={dataSource}
			columns={columns}
			pagination={false}
			scroll={{
				y: 'calc(100vh - 355px)',
			}}
		/>
	)
}

export default DerivativesTable
