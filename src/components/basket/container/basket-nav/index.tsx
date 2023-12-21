import { Flex, Button, DatePicker } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'

import { TimeRangePickerProps } from 'antd'
import { useState, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'

const { RangePicker } = DatePicker
const Index = () => {
	const {
		toggleSetBasketModalOpen,
		selectedBaskets,
		handleDateChange,
		startDate,
		endDate,
	} = useBasketStore()
	//const { token } = theme.useToken()
	const [disabledButton, setDisabledButton] = useState<boolean>(true)
	const handleDateChanged: TimeRangePickerProps['onChange'] = (e) => {
		const startDate = e?.[0]?.format('DD-MM-YYYY') || ''
		const endDate = e?.[1]?.format('DD-MM-YYYY') || ''
		handleDateChange(startDate, endDate)
	}

	useEffect(() => {
		if (startDate && endDate && selectedBaskets.length > 0) {
			setDisabledButton(false)
		} else {
			setDisabledButton(true)
		}
	}, [startDate, endDate, selectedBaskets, setDisabledButton])
	return (
		<Flex flex="1" className="p-[10px]">
			<Flex flex="1">
				<RangePicker
					format={'DD-MM-YYYY'}
					suffixIcon={<IoCalendarOutline />}
					style={{}}
					onChange={handleDateChanged}
				/>
			</Flex>
			<Flex flex={'1'} gap="middle" justify="flex-end">
				<Button
					type="primary"
					icon={<PlusOutlined />}
					onClick={() => toggleSetBasketModalOpen(true)}
				>
					Add New Basket
				</Button>
				<Button
					type="primary"
					disabled={disabledButton}
					icon={<PlayCircleOutlined />}
				>
					Start Back Testing
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
