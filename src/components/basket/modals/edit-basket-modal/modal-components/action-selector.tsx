import { Flex, Typography, theme, Segmented, SegmentedProps } from 'antd'
import { SegmentedValue } from 'antd/es/segmented'
import { useState } from 'react'

interface ActionSelectorProps {
	action1: string
	action2: string
	color1: string
	color2: string
	baseActionValue: string | undefined
	handleBaseActionChange: (val: string) => void
}

const ActionSelector: React.FC<ActionSelectorProps> = ({
	handleBaseActionChange,
	action1,
	action2,
	color1,
	color2,
	baseActionValue,
}) => {
	const [tag, setTag] = useState<string | undefined>(baseActionValue)
	const { token } = theme.useToken()

	const items = [
		{
			label: (
				<Typography.Text
					style={{
						color: color1,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					{action1}
				</Typography.Text>
			),
			value: action1,
		},
		{
			label: (
				<Typography.Text
					style={{
						color: color2,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
					}}
				>
					{action2}
				</Typography.Text>
			),
			value: action2,
		},
	]
	const handleTagChange: SegmentedProps['onChange'] = (
		tagVal: SegmentedValue
	) => {
		if (tagVal.toLocaleString() !== tag) {
			setTag(tagVal.toLocaleString())
			handleBaseActionChange(tagVal.toLocaleString())
		}
	}

	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
			}}
			vertical
			align="center"
			gap={'middle'}
		>
			<Segmented
				options={items}
				value={tag}
				onChange={handleTagChange}
				size="large"
			/>
		</Flex>
	)
}

export default ActionSelector
