import { Flex, Typography, theme } from 'antd'

//import { PlusOutlined } from '@ant-design/icons'

const EmptyBasket = () => {
	const { token } = theme.useToken()

	return (
		<Flex
			vertical
			gap={'middle'}
			justify="center"
			align="center"
			flex="1"
			className="select-none"
		>
			<Typography.Text
				style={{
					fontSize: token.fontSizeHeading4,
					opacity: '0.5',
					fontWeight: token.fontWeightStrong,
				}}
			>
				Baskets not available
			</Typography.Text>
		</Flex>
	)
}

export default EmptyBasket
