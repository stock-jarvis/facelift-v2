import { Flex, Select, SelectProps, Space, Typography, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { useMemo, useState } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'
import { DerivativesMetric } from '../../enums'

const { Text } = Typography

type TitleLinkValueProps = {
	title: string
	value: string
}

const TitleLinkValue: React.FC<TitleLinkValueProps> = ({ title, value }) => (
	<Space>
		<Link>{title} :</Link>
		<Text>{value}</Text>
		<PlusOutlined />
	</Space>
)

const DerivatiesParamSelection = () => {
	const { token } = theme.useToken()

	// TODO: Change variable name
	const [selectedDerivativeMetric, setSelectedDerivativeMetric] =
		useState<DerivativesMetric>(DerivativesMetric.OpenInterest)

	// TODO: Change variable name
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
