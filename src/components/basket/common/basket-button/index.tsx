import { Button, theme } from 'antd'

interface ButtonProps {
	children: React.ReactNode
	disabled: boolean
}
const BasketButton = ({ children, disabled }: ButtonProps) => {
	const { token } = theme.useToken()
	console.log(token)
	console.log(disabled)
	return (
		<Button size="large" type="primary">
			{children}
		</Button>
	)
}
export default BasketButton
