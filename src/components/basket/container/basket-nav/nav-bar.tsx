import { Flex, Button, DatePicker, theme } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'
import AddBasketModal from '../../modals/add-new-basket'
import { TimeRangePickerProps } from 'antd'
import { useState, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const Index = () => {
	const { token } = theme.useToken()
	const {
		clearSelectedBaskets,
		handleDateChange,
		selectedBaskets,
		startDate,
		endDate,
	} = useBasketStore()
	const [isAddModalOpen, setAddModal] = useState<boolean>(false)
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

	const handleDateChanged: TimeRangePickerProps['onChange'] = (e) => {
		const [startDate, endDate] = e ?? ['', '']
		handleDateChange(dayjs(startDate), dayjs(endDate))
	}

	const handleBackTestingButtonClicked = () => {
		clearSelectedBaskets()
	}

	useEffect(() => {
		if (
			startDate.isValid() &&
			endDate.isValid() &&
			selectedBaskets.length > 0
		) {
			setIsButtonDisabled(false)
		} else {
			setIsButtonDisabled(true)
		}
	}, [startDate, endDate, selectedBaskets, setIsButtonDisabled])

	const handleModalToggle = () => {
		setAddModal(!isAddModalOpen)
	}

	return (
		<>
			{isAddModalOpen && (
				<AddBasketModal handleModalToggle={handleModalToggle} />
			)}
			<Flex
				flex="1"
				style={{ padding: token.paddingXS }}
				justify="space-between"
				align="center"
			>
				<Flex>
					<RangePicker
						format={'DD-MM-YYYY'}
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
						disabled={isButtonDisabled}
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

export default Index
