import { Flex, Button, DatePicker, theme } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'
import AddBasketModal from '../../modals/add-new-basket'
import { TimeRangePickerProps } from 'antd'
import { useState, useMemo } from 'react'
import { useBasketStore } from '../../store/basket-store'
import { format } from '../../utils/date-format'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const BasketNav = () => {
	const { token } = theme.useToken()
	const {
		clearSelectedBaskets,
		handleDateChange,
		selectedBaskets,
		startDate,
		endDate,
	} = useBasketStore()
	const [isAddModalOpen, setAddModal] = useState<boolean>(false)
	const isButtonEnabled = useMemo(() => {
		return (
			startDate.isValid() && endDate.isValid() && selectedBaskets.length > 0
		)
	}, [startDate, endDate, selectedBaskets])

	const handleDateChanged: TimeRangePickerProps['onChange'] = (e) => {
		const [startDate, endDate] = e ?? ['', '']
		handleDateChange(dayjs(startDate), dayjs(endDate))
	}

	const handleBackTestingButtonClicked = () => {
		clearSelectedBaskets()
	}

	const handleModalToggle = () => {
		setAddModal((isAddModalOpen) => !isAddModalOpen)
	}

	return (
		<>
			{isAddModalOpen && (
				<AddBasketModal handleModalToggle={handleModalToggle} />
			)}
			<Flex
				style={{ padding: token.paddingXS }}
				justify="space-between"
				align="center"
			>
				<Flex>
					<RangePicker
						format={format}
						suffixIcon={<IoCalendarOutline />}
						onChange={handleDateChanged}
					/>
				</Flex>

				<Flex gap="middle" justify="flex-end">
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleModalToggle}
					>
						Add New Basket
					</Button>
					<Button
						disabled={!isButtonEnabled}
						icon={<PlayCircleOutlined />}
						onClick={handleBackTestingButtonClicked}
					>
						Start Back Testing
					</Button>
				</Flex>
			</Flex>
		</>
	)
}

export default BasketNav
