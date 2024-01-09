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
import { useEffect, useMemo, useState } from 'react'
import {
	convertToDefaultOption,
	convertValuesToDefaultOptions,
} from 'src/common/utils/conversion-utils'
import { DerivativesMetric } from '../../../../common/enums'
import { mockFutures } from './mock-data'
import { useAIOCContext } from '../../context/aioc-context'

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
	const { futures, isLoading } = useAIOCContext()

	const [selectedFuture, setSelectedFuture] = useState<number>()

	const derivativeMetricOptions = useMemo(
		() => convertValuesToDefaultOptions(Object.values(DerivativesMetric)),
		[]
	)

	const futuresOptions = useMemo(
		() =>
			Object.values(futures).map((future) =>
				convertToDefaultOption(future.lastTradedPrice)
			),
		[futures]
	)

	const handleChangeOption: SelectProps['onChange'] = (value) =>
		setSelectedDerivativeMetric(value)

	useEffect(() => {
		setSelectedFuture(futuresOptions[0]?.value as number)
	}, [futuresOptions])

	return (
		<Flex className="w-full" justify="space-between">
			<Flex flex={1} justify="flex-start">
				{/* // TODO: Wire up value and spot price link */}
				<Space size="small">
					<Text strong>Spot Price :</Text>
					<Space>
						<Text>38725</Text>
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
				{/* // TODO: Wire up value and futures link */}
				<Space size="small">
					<Text strong>Futures :</Text>
					<Flex>
						<Select
							loading={isLoading}
							value={selectedFuture}
							// TODO: Wire up with real data and memoize the conversion
							options={futuresOptions}
							bordered={false}
							placeholder="Loading..."
							dropdownStyle={{
								width: '110px',
							}}
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
