import { Flex, theme, Button, DatePicker } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'
import { TbSeparator } from 'react-icons/tb'

import { useBasketStore } from '../../store/basket-store'
const { RangePicker } = DatePicker
const Index = () => {
	const { toggleSetBasketModalOpen } = useBasketStore()
	const { token } = theme.useToken()
	return (
		<Flex flex="1" className="p-[10px]">
			<Flex flex="1">
				<RangePicker
					separator={<TbSeparator style={{ color: token.colorPrimary }} />}
					format={'DD-MM-YYYY'}
					suffixIcon={
						<IoCalendarOutline style={{ color: token.colorPrimary }} />
					}
					style={{
						borderColor: token.colorPrimary,
						color: token.colorText,
					}}
				/>
			</Flex>
			<Flex flex={'1'} gap="middle" justify="flex-end">
				<Button
					type="default"
					size="large"
					icon={<PlusOutlined />}
					style={{
						backgroundColor: token.colorPrimary,
						color: token.colorTextLightSolid,
					}}
					onClick={() => toggleSetBasketModalOpen(true)}
				>
					Add New Basket
				</Button>
				<Button
					type="default"
					size="large"
					disabled={true}
					style={{
						backgroundColor: token.colorPrimary,
						color: token.colorTextLightSolid,
					}}
					icon={<PlayCircleOutlined />}
				>
					Start Back Testing
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
