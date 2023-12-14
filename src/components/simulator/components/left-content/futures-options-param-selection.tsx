import { Flex, Select, SelectProps, Space, Typography, theme } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'antd/es/typography/Link'
import { useMemo, useState } from 'react'
import { convertValuesToDefaultOptions } from 'src/common/utils/conversion-utils'

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

// TODO: Change to appropriate name
const foTypes = ['OI'] as const

type FoType = (typeof foTypes)[number]

const FuturesOptionsParamSelection = () => {
	const { token } = theme.useToken()

	// TODO: Change variable name
	const [selectedOption, setSelectedOption] = useState<FoType>('OI')

	// TODO: Change variable name
	// @ts-expect-error timeUnits is TimeUnit[] type and the function expects array of string or number
	// TimeUnit[] is ultimately a string array.
	const options = useMemo(() => convertValuesToDefaultOptions(foTypes), [])

	const handleChangeOption: SelectProps['onChange'] = (value) =>
		setSelectedOption(value)

	return (
		<Flex className="w-full" justify="space-between">
			{/* // TODO: Wire up value and spot price link */}
			<TitleLinkValue title="Spot Price" value="38750" />

			<Select
				style={{
					borderBottom: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
				}}
				value={selectedOption}
				options={options}
				bordered={false}
				onChange={handleChangeOption}
			/>

			{/* // TODO: Wire up value and futures link */}
			<TitleLinkValue title="Futures" value="38750" />
		</Flex>
	)
}

export default FuturesOptionsParamSelection
