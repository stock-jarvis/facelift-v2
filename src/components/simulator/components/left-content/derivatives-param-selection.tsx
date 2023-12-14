import { Flex, Select, SelectProps, Space, Typography, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { useMemo, useState } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { DerivativesMetric } from '../../types'
import { availableDerivativesMetrics } from '../../constants'

const { Text } = Typography

type TitleLinkValueProps = {
	title: string
	value: string
}

const TitleLinkValue: React.FC<TitleLinkValueProps> = ({ title, value }) => (
	<Space>
		<Link>
			<PlusOutlined /> {title} :
		</Link>
		<Text>{value}</Text>
	</Space>
)

const DerivatiesParamSelection = () => {
	const { token } = theme.useToken()

	// TODO: Change variable name
	const [selectedDerivativeMetric, setSelectedDerivativeMetric] =
		useState<DerivativesMetric>('OI')

	// TODO: Change variable name
	const derivativeMetricOptions = useMemo(
		// @ts-expect-error availableDerivativesMetrics is DerivativesMetric[] type and the function expects array of string or number
		// DerivativesMetric[] is ultimately a string array.
		() => convertValuesToDefaultOptions(availableDerivativesMetrics),
		[]
	)

	const handleChangeOption: SelectProps['onChange'] = (value) =>
		setSelectedDerivativeMetric(value)

	return (
		<Flex className="w-full" justify="space-between">
			{/* // TODO: Wire up value and spot price link */}
			<TitleLinkValue title="Spot Price" value="38750" />

			<Select
				style={{
					width: 78,
					borderBottom: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
				}}
				value={selectedDerivativeMetric}
				options={derivativeMetricOptions}
				bordered={false}
				onChange={handleChangeOption}
			/>

			{/* // TODO: Wire up value and futures link */}
			<TitleLinkValue title="Futures" value="38750" />
		</Flex>
	)
}

export default DerivatiesParamSelection
