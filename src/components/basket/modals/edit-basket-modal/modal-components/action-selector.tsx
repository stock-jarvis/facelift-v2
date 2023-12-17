import { Flex, Typography, theme, Divider } from 'antd'
import { useState, useEffect } from 'react'

interface ActionSelectorProps {
	handleBaseActionChange: (val: string) => void
	label: string
	action1: string
	action2: string
	color1: string
	color2: string
	baseActionValue: string
}

const ActionSelector = ({
	label,
	action1,
	action2,
	color1,
	color2,
	baseActionValue,
	handleBaseActionChange,
}: ActionSelectorProps) => {
	const [tag, setTag] = useState<string>()
	const { token } = theme.useToken()

	const handleTagChange = (tagVal: string) => {
		if (tagVal !== tag) {
			setTag(tagVal)
			handleBaseActionChange(tagVal)
		}
	}

	useEffect(() => {
		if (!tag) {
			setTag(baseActionValue)
		}
	}, [baseActionValue, tag])
	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
				//boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
			}}
			vertical
			align="center"
			gap={'middle'}
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				{label}
			</Typography.Text>
			<Flex align="center">
				<div
					style={{
						cursor: 'pointer',
						padding: token.paddingSM,
						borderBottom:
							tag === action1 ? `2px solid ${color1}` : '2px solid transparent',
					}}
					onClick={() => handleTagChange(action1)}
				>
					<Typography.Text
						style={{ fontWeight: token.fontWeightStrong, color: color1 }}
					>
						{action1}
					</Typography.Text>
				</div>
				<Divider
					type="vertical"
					style={{ fontSize: token.fontSizeHeading1, fill: 'black' }}
				/>
				<div
					style={{
						cursor: 'pointer',
						padding: token.paddingSM,
						borderBottom:
							tag === action2 ? `2px solid ${color2}` : '2px solid transparent',
					}}
					onClick={() => handleTagChange(action2)}
				>
					<Typography.Text
						style={{ fontWeight: token.fontWeightStrong, color: color2 }}
					>
						{action2}
					</Typography.Text>
				</div>
			</Flex>
		</Flex>
	)
}

export default ActionSelector
