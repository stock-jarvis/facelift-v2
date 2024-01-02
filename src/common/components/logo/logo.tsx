import { Flex, theme } from 'antd'

const Logo = () => {
	const { token } = theme.useToken()

	return (
		<Flex gap={8}>
			<Flex
				style={{
					color: 'black',
					fontSize: token.fontSizeHeading4,
					fontWeight: token.fontWeightStrong,
				}}
			>
				SYSTEM
			</Flex>
			<Flex
				style={{
					color: '#2C9AFF',
					fontSize: token.fontSizeHeading4,
					fontWeight: token.fontWeightStrong,
				}}
			>
				TRADE
			</Flex>
		</Flex>
	)
}

export default Logo
