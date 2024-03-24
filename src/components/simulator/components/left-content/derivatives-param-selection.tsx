import {
	Button,
	ButtonProps,
	Flex,
	Select,
	SelectProps,
	Space,
	Tooltip,
	TooltipProps,
	Typography,
	theme,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useMemo, useState, useEffect } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { DerivativesMetric } from '../../../../common/enums'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import { sort } from 'radash'
import useGetSpotData from 'src/api/simulator/hooks/use-get-spot-data'
import useGetAIOCData from 'src/api/simulator/hooks/use-get-aioc'

const { Text } = Typography

type DerivatiesParamSelectionProps = {
	selectedDerivativeMetric?: DerivativesMetric
	setSelectedDerivativeMetric: (
		selectedDerivativeMetric: DerivativesMetric
	) => void
}

const DerivatiesParamSelection: React.FC<DerivatiesParamSelectionProps> = ({
	selectedDerivativeMetric,
	setSelectedDerivativeMetric,
}) => {
	const { token } = theme.useToken()
	const { exchange, activeInstrument, date, time } = useSimulatorParamsStore()
	const { data: AIOC, isLoading: isFetchingAIOSData } = useGetAIOCData(
		date,
		time,
		exchange,
		activeInstrument
	)
	const { data: spotData } = useGetSpotData(
		date,
		time,
		exchange,
		activeInstrument
	)

	const [selectedFuture, setSelectedFuture] = useState<number>()

	const derivativeMetricOptions = useMemo(
		() => convertValuesToDefaultOptions(Object.values(DerivativesMetric)),
		[]
	)

	const futureOptions = useMemo(() => {
		const options =
			Object.keys(AIOC?.Futures || {}).map((key) => AIOC?.Futures?.[key].ltp) ??
			[]

		return convertValuesToDefaultOptions(sort(options, (x) => x as number))
	}, [AIOC?.Futures])

	useEffect(() => {
		if (!selectedFuture) {
			setSelectedFuture((futureOptions?.[0]?.value as number) || undefined)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [futureOptions])

	const handleChangeOption: SelectProps['onChange'] = (value) =>
		setSelectedDerivativeMetric(value)

	return (
		<Flex className="w-full" justify="space-between">
			<Flex flex={1} justify="flex-start">
				<Space size="small">
					<Text strong>Spot Price :</Text>
					<Space>
						<Text>{spotData?.Open || 'NIL'}</Text>
						<AddPositionButton tooltipTitle="Add position" />
					</Space>
				</Space>
			</Flex>

			<Flex flex={1} justify="center">
				<Select
					allowClear
					value={selectedDerivativeMetric}
					options={derivativeMetricOptions}
					bordered={false}
					// TODO: Triangle instead of Delta
					placeholder="IV, Δ, OI"
					onChange={handleChangeOption}
					style={{
						width: 95,
						borderBottom: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
					}}
				/>
			</Flex>

			<Flex flex={1} justify="flex-end">
				<Space size="small">
					<Text strong>Futures :</Text>
					<Flex>
						<Select
							style={{ minWidth: '5rem' }}
							options={futureOptions}
							value={selectedFuture}
							loading={isFetchingAIOSData}
							bordered={false}
							onChange={setSelectedFuture}
						/>
						<AddPositionButton tooltipTitle="Add position" />
					</Flex>
				</Space>
			</Flex>
		</Flex>
	)
}

type AddPositionButton = {
	// TODO: Remove prop if Add position text for both is finalized
	tooltipTitle: TooltipProps['title']
	// TODO: Make it mandatory after implementation
	onClick?: ButtonProps['onClick']
}

const AddPositionButton: React.FC<AddPositionButton> = ({
	tooltipTitle,
	onClick,
}) => (
	<Tooltip title={tooltipTitle}>
		<Button type="link" shape="round" style={{ padding: 0 }} onClick={onClick}>
			<PlusOutlined />
		</Button>
	</Tooltip>
)

export default DerivatiesParamSelection
