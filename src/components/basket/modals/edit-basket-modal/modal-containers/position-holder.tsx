import { Button, Flex, Tooltip } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd'
interface PositionHolderProps {
	onClick: (val: string) => void
	children: React.ReactNode

	basketType: string
}
const PositionHolder: React.FC<PositionHolderProps> = ({
	onClick,
	children,
	basketType,
}) => {
	const handleClick: ButtonProps['onClick'] = () => {
		onClick(basketType)
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
