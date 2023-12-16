import { Flex, Typography, theme, Divider } from 'antd'
import { useState } from 'react'
const ActionSelector = () => {
	const [tag, setTag] = useState('B')
	const { token } = theme.useToken()

	const handleTagChange = (tagVal: string) => {
		if (tagVal !== tag) {
			setTag(tagVal)
		}
	}
	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25) inset',
			}}
			vertical
			align="center"
			gap={'middle'}
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				Action Type
			</Typography.Text>
			<Flex gap={'middle'} align="center">
				<div
					style={{
						padding: token.paddingSM,
						borderBottom:
							tag === 'B' ? '2px solid green' : '2px solid transparent',
					}}
					onClick={() => handleTagChange('B')}
				>
					<Typography.Text
						style={{ fontWeight: token.fontWeightStrong, color: 'green' }}
					>
						B
					</Typography.Text>
				</div>
				<Divider
					type="vertical"
					style={{ fontSize: token.fontSizeHeading1, fill: 'black' }}
				/>
				<div
					style={{
						padding: token.paddingSM,
						borderBottom:
							tag === 'S' ? '2px solid red' : '2px solid transparent',
					}}
					onClick={() => handleTagChange('S')}
				>
					<Typography.Text
						style={{ fontWeight: token.fontWeightStrong, color: 'red' }}
					>
						S
					</Typography.Text>
				</div>
			</Flex>
		</Flex>
	)
}

export default ActionSelector
