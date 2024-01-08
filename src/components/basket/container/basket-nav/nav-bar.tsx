import { Flex, Button, DatePicker, theme } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'

import { TimeRangePickerProps } from 'antd'
import { useState, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const Index = () => {
	const { token } = theme.useToken()
	const {
		toggleSetBasketModalOpen,
		clearSelectedBaskets,
		handleDateChange,
		selectedBaskets,
		startDate,
		endDate,
	} = useBasketStore()
	const [disabledButton, setDisabledButton] = useState<boolean>(true)

	const handleDateChanged: TimeRangePickerProps['onChange'] = (e) => {
		const [startDate, endDate] = e ?? ''
		handleDateChange(dayjs(startDate), dayjs(endDate))
	}

	const handleBackTestingButtonClicked = () => {
		clearSelectedBaskets()
	}

	useEffect(() => {
		if (startDate && endDate && selectedBaskets.length > 0) {
			setDisabledButton(false)
		} else {
			setDisabledButton(true)
		}
	}, [startDate, endDate, selectedBaskets, setDisabledButton])

	return (
		<Flex
			flex="1"
			style={{ padding: token.paddingSM }}
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
					onClick={() => toggleSetBasketModalOpen(true)}
				>
					Add New Basket
				</Button>
				<Button
					type="default"
					disabled={disabledButton}
					icon={<PlayCircleOutlined />}
					onClick={handleBackTestingButtonClicked}
				>
					Start Back Testing
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
