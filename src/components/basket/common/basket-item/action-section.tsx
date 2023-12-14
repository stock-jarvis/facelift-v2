import { Flex, Tooltip, theme } from 'antd'

interface ActionProps {
	actions: Array<{ key: string; icon: React.ReactNode; toolTipLabel: string }>
}
const ActionSection = ({ actions }: ActionProps) => {
	const { token } = theme.useToken()
	return (
		<Flex
			align="center"
			style={{
				backgroundColor: token.colorPrimary,
				color: token.colorTextHeading,
			}}
		>
			{actions.map((icon, i) => (
				<Flex
					key={icon.key}
					style={{
						padding: token.padding,
						borderRight:
							i !== actions.length - 1
								? `1px solid ${token.colorPrimaryBorder}`
								: '',
					}}
				>
					<Tooltip title={icon.toolTipLabel}>{icon.icon}</Tooltip>
				</Flex>
			))}
		</Flex>
	)
}

export default ActionSection
