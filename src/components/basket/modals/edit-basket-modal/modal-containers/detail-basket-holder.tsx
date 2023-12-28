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
				//boxShadow: '-2px 2px 3px 3px rgba(0, 0, 0, 0.25)',
				padding: token.paddingSM,
				borderRadius: token.borderRadiusLG,
				//	backgroundColor: '#F1F8FF',
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
