import { Button, Flex, Typography, theme } from 'antd'
interface PositionHolderProps {
	children: React.ReactNode
}
const PositionHolder = ({ children }: PositionHolderProps) => {
	const { token } = theme.useToken()
	return (
		<Flex
			vertical
			flex={1}
			gap="middle"
			style={{
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				padding: token.paddingSM,
				borderRadius: token.borderRadiusLG,
				//	backgroundColor: '#F1F8FF',
			}}
		>
			<Flex flex={1} justify="center" align="center" gap="middle">
				<Typography.Text
					style={{
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
						padding: token.paddingXS,
						borderRadius: token.borderRadiusLG,
						boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
					}}
				>
					Options
				</Typography.Text>
			</Flex>
			<Flex justify="center" align="center" flex={1}>
				{children}
			</Flex>
			<Flex justify="center">
				<Button
					size="large"
					style={{
						backgroundColor: token.colorPrimary,
						fontSize: token.fontSizeLG,
						fontWeight: token.fontWeightStrong,
						color: token.colorBgBase,
					}}
				>
					Add Position
				</Button>
			</Flex>
		</Flex>
	)
}

export default PositionHolder
