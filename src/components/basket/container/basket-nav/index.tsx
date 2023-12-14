import { Flex, DatePicker, theme, Tooltip } from 'antd'
import Button from '../../common/basket-button'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
//import { useToggle } from '../../hooks/useToggleModal'
import { useBasketStore } from '../../store/basket-store'
const { RangePicker } = DatePicker
const Index = () => {
	const { toggleSetBasketModalOpen } = useBasketStore()
	const { token } = theme.useToken()
	//const [setIsModalOpen] = useToggle()
	return (
		<Flex flex="1" className="p-[10px]">
			<Flex flex="1">
				<Tooltip title="Select Date Range">
					<RangePicker
						format={'DD-MM-YYYY'}
						style={{
							borderColor: token.colorBorderSecondary,
							color: token.colorText,
						}}
					/>
				</Tooltip>
			</Flex>
			<Flex flex={'1'} gap="middle" justify="flex-end">
				<Button disabled={false}>
					<Flex
						justify="center"
						align="center"
						style={{ fontSize: 20 }}
						gap="middle"
						onClick={() => toggleSetBasketModalOpen(true)}
					>
						<PlusOutlined />
						<p>Add New Basket</p>
					</Flex>
				</Button>
				<Button disabled>
					<Flex
						justify="center"
						align="center"
						style={{ fontSize: 20 }}
						gap="middle"
					>
						<PlayCircleOutlined />
						<p>Start Back Testing</p>
					</Flex>
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
