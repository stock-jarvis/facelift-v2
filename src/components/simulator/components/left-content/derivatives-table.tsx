import {
	Alert,
	Table as AntdTable,
	TableProps as AntdTableProps,
	Space,
	theme,
} from 'antd'
import { useMemo } from 'react'
import { DerivativesMetric } from 'src/common/enums'
import { Option } from 'src/common/types'
import { findClosest } from 'src/common/utils/find-utils'
import { useAIOCContext } from '../../context/aioc-context'

type DerivativesTableDataSource = Omit<Option, 'greeks'>

const Table = AntdTable<DerivativesTableDataSource>
type TableProps = AntdTableProps<DerivativesTableDataSource>

type DerivativesTableProps = {
	selectedDerivativeMetric?: DerivativesMetric
}

const DerivativesTable: React.FC<DerivativesTableProps> = ({
	selectedDerivativeMetric,
}) => {
	const { token } = theme.useToken()
	const {
		isLoading,
		isError,
		optionChain: optionChainByDate,
	} = useAIOCContext()

	const spotPrice = 39250

	const strikePriceClosestToSpotPrice = useMemo(
		() =>
			findClosest(
				// TODO: Wire up
				[{ strike: 100 }].map((data) => data.strike),
				spotPrice
			),
		[spotPrice]
	)

	const dataSource: TableProps['dataSource'] = useMemo(() => [], [])

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
		<Space>
			{isError && (
				<Alert
					type="error"
					message="Something went wrong while loading Option Chain. Please try again."
				/>
			)}
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
				loading={isLoading}
				dataSource={dataSource}
				columns={columns}
				pagination={false}
				scroll={{
					y: 'calc(100vh - 400px)',
				}}
			/>
		</Space>
	)
}

export default DerivativesTable
