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
				boxSizing: 'content-box',
				backgroundColor: 'transparent',
			}}
		>
			{actions.map((icon) => (
				<Flex
					key={icon.key}
					style={{
						boxSizing: 'content-box',
						padding: token.paddingXS,
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
