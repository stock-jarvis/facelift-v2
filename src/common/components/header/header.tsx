import { Button, Flex, theme } from 'antd'
import SystemTradeNavLink from '../system-trade-nav-link'
import { UserOutlined } from '@ant-design/icons'
import Logo from '../logo'

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
				<SystemTradeNavLink to="/simulator">Simulation</SystemTradeNavLink>

				<SystemTradeNavLink to="/not-found">Basket</SystemTradeNavLink>

				<SystemTradeNavLink to="/not-found">AI Strategies</SystemTradeNavLink>
			</Flex>
			<Flex flex={2} align="center" justify="center">
				<Logo />
			</Flex>
			<Flex flex={2} align="center" justify="space-between">
				<SystemTradeNavLink to="/not-found">Indicator</SystemTradeNavLink>
				<SystemTradeNavLink to="/not-found">Learn</SystemTradeNavLink>
				<SystemTradeNavLink to="/not-found">Pricing</SystemTradeNavLink>
				<Button size="small" shape="circle">
					<UserOutlined />
				</Button>
			</Flex>
		</Flex>
	)
}

export default Header
