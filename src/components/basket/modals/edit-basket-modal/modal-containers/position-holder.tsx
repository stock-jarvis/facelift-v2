import { Button, Flex, Typography, theme, Tooltip } from 'antd'
import { ButtonProps } from 'antd'
interface PositionHolderProps {
	onClick: (val: string) => void
	children: React.ReactNode
	heading: string
	basketType: string
}
const PositionHolder = ({
	onClick,
	children,
	heading,
	basketType,
}: PositionHolderProps) => {
	const { token } = theme.useToken()

	const handleClick: ButtonProps['onClick'] = () => {
		onClick(basketType)
	}
	return (
		<Flex
			vertical
			flex={1}
			gap="middle"
			style={{
				//	boxShadow: '-2px 2px 3px 3px rgba(0, 0, 0, 0.25)',
				padding: token.paddingSM,
				borderRadius: token.borderRadiusLG,
			}}
		>
			<Flex flex={1} justify="center" align="center" gap="middle">
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
						padding: token.paddingXS,
						borderRadius: token.borderRadiusLG,
						//			boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
					}}
				>
					{heading}
				</Typography.Text>
			</Flex>
			<Flex justify="center" align="center" flex={1}>
				{children}
			</Flex>
			<Flex justify="center">
				<Tooltip title="Click to Add Position">
					<Button type="primary" onClick={handleClick}>
						Add Position
					</Button>
				</Tooltip>
			</Flex>
		</Flex>
	)
}

export default PositionHolder
