import { Flex, Tooltip, theme } from 'antd'
import { iconsSections } from '../../constants/data'

const ActionSection = () => {
	const { token } = theme.useToken()
	return (
		<Flex
			align="center"
			style={{
				backgroundColor: token.colorPrimary,
				color: token.colorTextHeading,
			}}
		>
			{iconsSections.map((icon, i) => (
				<Flex
					key={icon.key}
					style={{
						padding: token.padding,
						borderRight:
							i !== iconsSections.length - 1
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
