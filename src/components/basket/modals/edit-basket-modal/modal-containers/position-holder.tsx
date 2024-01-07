import { Button, Flex, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd'
import { BasketLegType } from 'src/common/enums'
interface PositionHolderProps {
	handleAddClick: (leg: BasketLegType) => void
	children: React.ReactNode
	basketType: BasketLegType
}
const PositionHolder: React.FC<PositionHolderProps> = ({
	handleAddClick,
	children,
	basketType,
}) => {
	const handleClick: ButtonProps['onClick'] = () => {
		handleAddClick(basketType)
	}
	return (
		<Flex vertical flex={1} gap="middle">
			<Flex justify="center" align="center" flex={1}>
				{children}
			</Flex>
			<Flex justify="flex-end">
				<Tooltip title="Click to Add Position">
					<Button type="primary" onClick={handleClick} icon={<PlusOutlined />}>
						Add Position
					</Button>
				</Tooltip>
			</Flex>
		</Flex>
	)
}

export default PositionHolder
