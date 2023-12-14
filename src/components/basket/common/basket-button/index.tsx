import { Button, theme } from 'antd'

interface ButtonProps {
	children: React.ReactNode
	disabled: boolean
}
const BasketButton = ({ children, disabled }: ButtonProps) => {
	const { token } = theme.useToken()
	return (
		<Button
			size="large"
			style={{
				backgroundColor: !disabled
					? token.colorPrimary
					: token.colorTextDisabled,
				borderColor: token.colorPrimary,
				color: !disabled ? token.colorTextHeading : token.colorTextBase,
				borderRadius: token.borderRadiusLG,
				border: '1px solid ',
				paddingInline: 60,
				paddingTop: 20,
				paddingBottom: 20,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{children}
		</Button>
	)
}
export default BasketButton
