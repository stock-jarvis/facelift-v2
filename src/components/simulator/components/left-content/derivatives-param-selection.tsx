import { Flex, Select, SelectProps, Space, Typography, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { useMemo } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { DerivativesMetric } from '../../../../common/enums'

const { Text } = Typography

type TitleLinkValueProps = {
	title: string
	value: string
}

const TitleLinkValue: React.FC<TitleLinkValueProps> = ({ title, value }) => (
	<Space size="small">
		<Text strong>{title} :</Text>
		<Link>
			<Space>
				<Text>{value}</Text>
				<PlusOutlined />
			</Space>
		</Link>
	</Space>
)

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

	const derivativeMetricOptions = useMemo(
		() => convertValuesToDefaultOptions(Object.values(DerivativesMetric)),
		[]
	)

	const handleChangeOption: SelectProps['onChange'] = (value) =>
		setSelectedDerivativeMetric(value)

	return (
		<Flex className="w-full" justify="space-between">
			{/* // TODO: Wire up value and spot price link */}
			<TitleLinkValue title="Spot Price" value="38750" />

			<Select
				allowClear
				value={selectedDerivativeMetric}
				options={derivativeMetricOptions}
				bordered={false}
				placeholder="Select Metric"
				onChange={handleChangeOption}
				style={{
					width: 130,
					borderBottom: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
				}}
			/>

			{/* // TODO: Wire up value and futures link */}
			<TitleLinkValue title="Futures" value="38750" />
		</Flex>
	)
}

export default DerivatiesParamSelection
