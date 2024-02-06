import { Button, Flex, theme } from 'antd'
import SystemTradeNavLink from '../system-trade-nav-link'
import { UserOutlined } from '@ant-design/icons'
import LoginSignupModal from '../modals/auth'
import { useState } from 'react'

const Header = () => {
	const { token } = theme.useToken()

	const [loginModal, setLoginModal] = useState<boolean>(false)

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

				<SystemTradeNavLink to="/basket">Basket</SystemTradeNavLink>

				<SystemTradeNavLink to="/not-found">AI Strategies</SystemTradeNavLink>
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
			</Flex>
			<Flex flex={2} align="center" justify="space-between">
				<SystemTradeNavLink to="/not-found">Indicator</SystemTradeNavLink>
				<SystemTradeNavLink to="/not-found">Learn</SystemTradeNavLink>
				<SystemTradeNavLink to="/not-found">Pricing</SystemTradeNavLink>
				<Button size="small" shape="circle" onClick={() => setLoginModal(true)}>
					<UserOutlined />
				</Button>
			</Flex>
			<LoginSignupModal
				open={loginModal}
				handleOpen={(val) => setLoginModal(val)}
			/>
		</Flex>
	)
}

export default Header
