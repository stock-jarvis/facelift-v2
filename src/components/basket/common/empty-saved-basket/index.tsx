import { Flex, Typography, theme } from 'antd'

//import { PlusOutlined } from '@ant-design/icons'

const EmptyBasket = () => {
	const { token } = theme.useToken()

	return (
		<Flex vertical gap={'middle'} justify="center" align="center" flex="1">
			<Typography.Text style={{ fontSize: token.fontSizeLG }}>
				No Basket Saved
			</Typography.Text>
		</Flex>
	)
}

export default EmptyBasket
