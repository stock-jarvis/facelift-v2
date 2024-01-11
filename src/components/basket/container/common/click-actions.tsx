import { SavedBasket } from '../../types/types'
import { theme, ButtonProps, Tooltip, Button } from 'antd'

export interface ActionsButtonProps {
	tooltipTitle: string
	record?: SavedBasket
	icon: React.ReactNode
	handleButtonClick: (id: string, name: string) => void
}

const Actions: React.FC<ActionsButtonProps> = ({
	icon,
	record,
	tooltipTitle,
	handleButtonClick,
}) => {
	const { token } = theme.useToken()
	const actionButtonProps: ButtonProps = {
		icon: icon,
		type: 'text',
		shape: 'circle',
		style: { color: record!.error ? token.colorError : '' },
		onClick: handleButtonClick.bind(this, record!.id, record!.name!),
	}
	return (
		<Tooltip title={tooltipTitle}>
			<Button {...actionButtonProps} />
		</Tooltip>
	)
}
export default Actions
