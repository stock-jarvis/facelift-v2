import { SavedBasket } from '../../types/types'
import { theme, ButtonProps, Tooltip, Button } from 'antd'

export interface ActionsButtonProps {
	record?: SavedBasket
	handleButtonClick: (id: string, name: string) => void
	icon: React.ReactNode
	tooltipTitle: string
}

const Actions: React.FC<ActionsButtonProps> = ({
	record,
	icon,
	tooltipTitle,
	handleButtonClick,
}) => {
	const { token } = theme.useToken()
	const actionButtonProps: ButtonProps = {
		shape: 'circle',
		type: 'text',
	}
	return (
		<Tooltip title={tooltipTitle}>
			<Button
				{...actionButtonProps}
				style={
					record && {
						color: record.error ? token.colorError : '',
					}
				}
				icon={icon}
				onClick={handleButtonClick.bind(this, record!.id, record!.name!)}
			/>
		</Tooltip>
	)
}
export default Actions
