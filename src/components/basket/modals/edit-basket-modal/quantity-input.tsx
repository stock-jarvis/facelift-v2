import { Flex, Typography, theme, Input } from 'antd'
//import { useState } from 'react'
const QuantityInput = () => {
	//const [tag, setTag] = useState('B')
	const { token } = theme.useToken()

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
				Quantity
			</Typography.Text>
			<Input size="large" />
		</Flex>
	)
}

export default QuantityInput
