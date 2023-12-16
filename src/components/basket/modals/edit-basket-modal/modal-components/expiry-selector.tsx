import { Flex, Typography, theme, Select } from 'antd'
//import { useState } from 'react'
const ExpirySelector = () => {
	//	const [tag, setTag] = useState('B')
	const { token } = theme.useToken()

	// const handleTagChange = (tagVal: string) => {
	// 	if (tagVal !== tag) {
	// 		setTag(tagVal)
	// 	}
	// }
	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
				//boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
			}}
			vertical
			justify="center"
			align="center"
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				Expiry
			</Typography.Text>
			<Flex gap={'middle'} align="center">
				<Select style={{ width: '200px' }} size="large" />
			</Flex>
		</Flex>
	)
}

export default ExpirySelector
