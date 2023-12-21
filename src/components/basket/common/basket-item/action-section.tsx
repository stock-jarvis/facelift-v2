import { Flex, Tooltip, theme } from 'antd'
import { IconActions } from '../../types/types'
interface ActionProps {
	actions: IconActions[]
	handleActionClicked: (val: string) => void
}
const ActionSection: React.FC<ActionProps> = ({
	actions,
	handleActionClicked,
}) => {
	const { token } = theme.useToken()

	const handleOnClick = (icon: IconActions) => {
		handleActionClicked(icon.actionName)
	}

	return (
		<Flex
			align="center"
			style={{
				backgroundColor: token.colorPrimary,
				color: '#ffffff',
				boxSizing: 'content-box',
			}}
		>
			{actions.map((icon, i) => (
				<Flex
					key={icon.key}
					style={{
						boxSizing: 'content-box',
						padding: token.paddingXS,
						borderRight:
							i !== actions.length - 1
								? `1px solid ${token.colorPrimaryBorder}`
								: '',
					}}
					onClick={() => handleOnClick(icon)}
				>
					<Tooltip title={icon.toolTipLabel}>{icon.icon}</Tooltip>
				</Flex>
			))}
		</Flex>
	)
}

export default ActionSection
