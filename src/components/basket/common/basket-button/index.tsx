import { Button } from 'antd'

interface ButtonProps {
	children: React.ReactNode
	disabled: boolean
}
const BasketButton = ({ children, disabled }: ButtonProps) => {
	console.log(disabled)
	return <Button type="primary">{children}</Button>
}
export default BasketButton
