import {
	Alert,
	Table as AntdTable,
	TableProps as AntdTableProps,
	Button,
	Flex,
	Space,
	Typography,
	theme,
} from 'antd'
import { useEffect, useMemo, useState } from 'react'
import {
	DerivativesMetric,
	OptionContractType,
	TradeAction,
} from 'src/common/enums'
import { Option, TakenPosition } from 'src/common/types'
import { findClosest } from 'src/common/utils/find-utils'
import { useAIOCContext } from '../../context/aioc-context'
import ButtonCarousel from 'src/common/components/button-carousel'
import {
	convertDateFromServer,
	convertDateStringToServer,
	formatDate,
	formatTime,
} from 'src/common/utils/date-time-utils'
import { useTakenPositionsStore } from '../../store/taken-positions-store'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { generateId } from 'src/common/utils/miscellaneous-utils'

const Table = AntdTable<Option>
type TableProps = AntdTableProps<Option>

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
		expiryList,
		optionChain: optionChainByDate,
	} = useAIOCContext()
	const { date, time, activeInstrument } = useSimulatorParamsStore()

	const { addTakenPosition } = useTakenPositionsStore()

	const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>()

	const spotPrice = 32250

	const expiries = useMemo(
		() => expiryList.map((expiry) => formatDate(expiry)),
		[expiryList]
	)

	const optionChain = useMemo(
		() =>
			selectedExpiryDate
				? optionChainByDate[convertDateStringToServer(selectedExpiryDate)] ?? []
				: [],
		[optionChainByDate, selectedExpiryDate]
	)

	const strikePriceClosestToSpotPrice = useMemo(
		() =>
			findClosest(
				optionChain.map((data) => data.strike),
				spotPrice
			),
		[optionChain, spotPrice]
	)

	const handleAddPosition: PositionCellProps['onAddPosition'] = (
		option,
		optionContractType,
		tradeAction
	) => {
		console.log(date)
		const commonPropsOfPosition: Omit<
			TakenPosition,
			'entryPrice' | 'entryTime'
		> = {
			id: generateId(),
			strike: option.strike,
			expiry: convertDateFromServer(selectedExpiryDate!),
			entryDate: date,
			instrument: activeInstrument,
			tradeAction,
			contractType: optionContractType,
			// TODO: Wire up
			lastTradedPrice: 100,
			// TODO: Wire up
			lots: 10,
		}

		let typeSpecificOptionProps: Pick<TakenPosition, 'entryPrice' | 'entryTime'>

		if (optionContractType === OptionContractType.CE) {
			typeSpecificOptionProps = {
				entryTime: option.ceLastTradedTime ?? time,
				entryPrice: option.ceLastTradedPrice,
			}
		} else {
			// TODO: Difference between entry price and last traded price
			typeSpecificOptionProps = {
				entryTime: option.peLastTradedTime ?? time,
				entryPrice: option.peLastTradedPrice,
			}
		}

		addTakenPosition({ ...commonPropsOfPosition, ...typeSpecificOptionProps })
	}

	const columns: TableProps['columns'] = useMemo(() => {
		const columnsBuilder: TableProps['columns'] = []

		columnsBuilder.push({
			key: 'ceLastTradedPrice',
			title: 'CALL',
			dataIndex: 'ceLastTradedPrice',
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
			render: (_, option) => (
				<PositionCell
					option={option}
					optionContractType={OptionContractType.CE}
					onAddPosition={handleAddPosition}
				/>
			),
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
			key: 'peLastTradedPrice',
			title: 'PUT',
			dataIndex: 'peLastTradedPrice',
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
			render: (_, option) => (
				<PositionCell
					option={option}
					optionContractType={OptionContractType.PE}
					onAddPosition={handleAddPosition}
				/>
			),
		})

		return columnsBuilder
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDerivativeMetric, strikePriceClosestToSpotPrice])

	useEffect(() => {
		setSelectedExpiryDate(expiries[0])
	}, [expiries])

	return (
		// TODO: Implement Date selection component
		<Space className="w-full" direction="vertical" size="large">
			{isError && (
				<Alert
					type="error"
					message="Something went wrong while loading Option Chain. Please try again."
				/>
			)}
			<ButtonCarousel
				items={expiries}
				selected={selectedExpiryDate}
				onClick={setSelectedExpiryDate}
			/>
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
				columns={columns}
				loading={isLoading}
				pagination={false}
				dataSource={optionChain}
				scroll={{
					y: 'calc(100vh - 475px)',
				}}
			/>
		</Space>
	)
}

type PositionCellProps = {
	option: Option
	optionContractType: OptionContractType
	onAddPosition: (
		option: Option,
		optionContractType: OptionContractType,
		tradeAction: TradeAction
	) => void
}

const PositionCell: React.FC<PositionCellProps> = ({
	option,
	optionContractType,
	onAddPosition,
}) => {
	const { token } = theme.useToken()

	const handleAddBuyPosition = () =>
		onAddPosition(option, optionContractType, TradeAction.Buy)

	const handleAddSellPosition = () =>
		onAddPosition(option, optionContractType, TradeAction.Sell)

	const lastTradedTime =
		optionContractType === OptionContractType.CE
			? option.ceLastTradedTime
			: option.peLastTradedTime

	return (
		<Flex vertical>
			<Flex align="center" justify="space-between">
				<Button type="text" onClick={handleAddBuyPosition}>
					<Typography.Text type="success">B</Typography.Text>
				</Button>

				<Flex>
					{optionContractType === OptionContractType.CE
						? option.ceLastTradedPrice
						: option.peLastTradedPrice}
				</Flex>
				<Button type="text" onClick={handleAddSellPosition}>
					<Typography.Text type="danger">S</Typography.Text>
				</Button>
			</Flex>
			{lastTradedTime && (
				<Typography.Text
					type="secondary"
					style={{ fontSize: token.fontSizeSM }}
				>
					{formatTime(lastTradedTime)}
				</Typography.Text>
			)}
		</Flex>
	)
}

export default DerivativesTable
