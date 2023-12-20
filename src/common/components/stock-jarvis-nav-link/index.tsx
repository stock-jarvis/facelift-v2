import { theme } from 'antd'
import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

type StockJarvisNavLinkProps = NavLinkProps

const StockJarvisNavLink: React.FC<StockJarvisNavLinkProps> = (props) => {
	const { style, children, ...rest } = props

	const { token } = theme.useToken()

	const getNavLinkStyle: NavLinkProps['style'] = (navLinkRenderProps) => ({
		color: token.colorWhite,
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

export default StockJarvisNavLink
