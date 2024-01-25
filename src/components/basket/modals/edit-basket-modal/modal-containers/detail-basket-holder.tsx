import { Flex, theme, Tooltip } from 'antd'
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons'

interface PositionHolderProps {
	id: string
	children: React.ReactNode
	handleCopyBasket: (val: string) => void
	handleDeleteBasket: (val: string) => void
}
const DetailBasketHolder: React.FC<PositionHolderProps> = ({
	id,
	children,
	handleCopyBasket,
	handleDeleteBasket,
}) => {
	const { token } = theme.useToken()
	return (
		<Flex
			flex={1}
			gap="middle"
			style={{
				padding: token.paddingSM,
				borderRadius: token.borderRadiusLG,
			}}
		>
			<Flex justify="center" align="center" flex={1}>
				{children}
			</Flex>
			<Flex
				justify="center"
				align="center"
				style={{ padding: token.paddingSM }}
				gap="middle"
			>
				<Tooltip title="Duplicate">
					<CopyOutlined
						style={{ fontSize: token.fontSizeXL }}
						onClick={() => handleCopyBasket(id)}
					/>
				</Tooltip>
				<Tooltip title="Delete">
					<DeleteOutlined
						style={{ fontSize: token.fontSizeXL }}
						onClick={() => handleDeleteBasket(id)}
					/>
				</Tooltip>
			</Flex>
		</Flex>
	)
}

export default DetailBasketHolder
