import {
	Table as AntdTable,
	TableProps as AntdTableProps,
	Flex,
	theme,
} from 'antd'
import { useMemo } from 'react'
import {
	DerivativesMetric,
	OptionContractType,
	TradeAction,
} from 'src/common/enums'
import { findClosest } from 'src/common/utils/find-utils'
import DerivatiesExpiries from '../derivatives-expiries'
import useGetSpotData from 'src/api/simulator/hooks/use-get-spot-data'
import { useSimulatorParamsStore } from '../../../store/simulator-params-store'
import useGetAIOCData from 'src/api/simulator/hooks/use-get-aioc'
import { renderCallCell, renderPutCell } from './cell-renderer'
import { useSimulatorPositionsStore } from 'src/components/simulator/store/simulator-positions-store'
import { getCachedLotSize } from 'src/api/simulator/hooks/use-lots-size'

export type DerivativesTableDataSource = {
	call_ltp: number
	put_ltp: number
	strike: number
	call_ltt: number
	put_llt: number
	call_OI: number
	put_OI: number
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
	const { exchange, activeInstrument, date, time, activeInstrumentMetadata } =
		useSimulatorParamsStore()
	const { addPosition } = useSimulatorPositionsStore()
	const selectedExpiry = activeInstrumentMetadata()?.selectedExpiry as number

	const { data: spotData } = useGetSpotData(
		date,
		time,
		exchange,
		activeInstrument
	)

	const { data: AIOC, isFetching } = useGetAIOCData(
		date,
		time,
		exchange,
		activeInstrument,
		[selectedExpiry]
	)

	const handleAddPosition = (
		tradeAction: TradeAction,
		contractType: OptionContractType,
		record: DerivativesTableDataSource
	) => {
		const lotSize = getCachedLotSize(date, activeInstrument)

		addPosition({
			instrument: activeInstrument,
			contractType: contractType,
			tradeAction: tradeAction,
			entryDate: date,
			entryTime: time,
			strikePrice: record.strike,
			entryPrice:
				contractType === OptionContractType.CE
					? record.call_ltp
					: record.put_ltp,
			lots: lotSize[selectedExpiry],
			expiry: selectedExpiry,
			profitAndLoss: 100,
			lastTradedPrice: 1000,
			exited: false,
		})
	}

	const { datasource, strikePriceClosestToSpotPrice } = useMemo(() => {
		const data: DerivativesTableDataSource[] =
			AIOC?.OptionChain?.[selectedExpiry]?.OptionChain?.map((option) => ({
				call_ltt: option.celtt,
				call_ltp: option.celtp,
				strike: option.strike,
				put_llt: option.peltt,
				put_ltp: option.peltp,
				call_OI: option.greeks.ceoi,
				put_OI: option.greeks.peoi,
			})) ?? []

		const strikePriceClosestToSpotPrice = findClosest(
			data.map((data) => data.strike),
			spotData?.Open || 0
		)

		return {
			strikePriceClosestToSpotPrice,
			datasource: data,
		}
	}, [AIOC?.OptionChain, selectedExpiry, spotData?.Open])

	const columns: TableProps['columns'] = useMemo(() => {
		const columnsBuilder: TableProps['columns'] = []

		columnsBuilder.push({
			key: 'call_ltp',
			title: 'CALL',
			dataIndex: 'call_ltp',
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
			render: (_, record) =>
				renderCallCell(record, (...rest) => handleAddPosition(...rest, record)),
		})

		if (selectedDerivativeMetric) {
			columnsBuilder.push({
				key: 'call_' + selectedDerivativeMetric,
				title: selectedDerivativeMetric,
				dataIndex: 'call_' + selectedDerivativeMetric,
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
				key: 'put_' + selectedDerivativeMetric,
				title: selectedDerivativeMetric,
				dataIndex: 'put_' + selectedDerivativeMetric,
				width: 12,
				align: 'center',
			})
		}

		columnsBuilder.push({
			key: 'put_ltp',
			title: 'PUT',
			dataIndex: 'put_ltp',
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
			render: (_, record) =>
				renderPutCell(record, (...rest) => handleAddPosition(...rest, record)),
		})

		return columnsBuilder
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDerivativeMetric, strikePriceClosestToSpotPrice])

	return (
		<Flex vertical gap="small">
			<DerivatiesExpiries />
			<Table
				/**
				 * selectedDerivativeMetric causes the columns to change,
				 * so using it as key destroys and recreates the table.
				 */
				key={selectedDerivativeMetric}
				size="small"
				rowKey="id"
				// TODO: Fix virtual
				loading={isFetching}
				dataSource={datasource}
				columns={columns}
				pagination={false}
				scroll={{
					y: 'calc(100vh - 400px)',
				}}
			/>
		</Flex>
	)
}

export default DerivativesTable
