import { theme } from 'antd'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

type SystemTradeNavLinkProps = NavLinkProps

const SystemTradeNavLink: React.FC<SystemTradeNavLinkProps> = (props) => {
	const { style, children, ...rest } = props

	const { token } = theme.useToken()

	const getNavLinkStyle: NavLinkProps['style'] = (navLinkRenderProps) => ({
		color: 'black', //token.colorWhite,
		fontWeight: navLinkRenderProps.isActive
			? token.fontWeightStrong
			: undefined,
		...style,
	})

	return (
		<NavLink style={getNavLinkStyle} {...rest}>
			{children}
		</NavLink>
	)
}

export default SystemTradeNavLink
