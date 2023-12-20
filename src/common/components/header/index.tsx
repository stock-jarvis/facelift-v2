import { Button, Flex, theme } from 'antd'
import StockJarvisNavLink from '../stock-jarvis-nav-link'
import { UserOutlined } from '@ant-design/icons'

const Header = () => {
	const { token } = theme.useToken()

	return (
		<Flex
			justify="space-between"
			align="center"
			style={{
				height: `${token.sizeXXL}px`,
				backgroundColor: token.colorWhite, //'#043949',
				padding: `16px ${token.paddingContentHorizontalLG}px`,
				boxShadow: 'rgba(149, 157, 165, 0.6) 0px 0px 18px',
			}}
		>
			<Flex flex={2} align="center" justify="space-between">
				<StockJarvisNavLink to="/simulator">Simulation</StockJarvisNavLink>

				<StockJarvisNavLink to="/not-found">Basket</StockJarvisNavLink>

				<StockJarvisNavLink to="/not-found">AI Strategies</StockJarvisNavLink>
			</Flex>
			<Flex flex={2} align="center" justify="center">
				<Flex gap={8}>
					<Flex
						style={{
							color: 'black',
							fontSize: token.fontSizeHeading4,
							fontWeight: token.fontWeightStrong,
						}}
					>
						STOCK
					</Flex>
					<Flex
						style={{
							color: '#2C9AFF',
							fontSize: token.fontSizeHeading4,
							fontWeight: token.fontWeightStrong,
						}}
					>
						JARVIS
					</Flex>
				</Flex>
			</Flex>
			<Flex flex={2} align="center" justify="space-between">
				<StockJarvisNavLink to="/not-found">Indicator</StockJarvisNavLink>
				<StockJarvisNavLink to="/not-found">Learn</StockJarvisNavLink>
				<StockJarvisNavLink to="/not-found">Pricing</StockJarvisNavLink>
				<Button size="small" shape="circle">
					<UserOutlined />
				</Button>
			</Flex>
		</Flex>
	)
}

export default Header
