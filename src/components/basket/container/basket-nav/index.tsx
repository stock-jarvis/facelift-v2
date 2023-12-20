import { Flex, theme, Button, DatePicker } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'

import { TbSeparator } from 'react-icons/tb'
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
	const { token } = theme.useToken()
	const [disabledButton, setDisabledButton] = useState<boolean>(true)
	const disabledStyles = {
		backgroundColor: token.colorBgBase,
		color: token.colorPrimary,
		borderColor: token.colorPrimary,
	}
	const enabledStyles = {
		color: token.colorBgBase,
		backgroundColor: token.colorPrimary,
	}
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
					separator={<TbSeparator style={{ color: token.colorPrimary }} />}
					format={'DD-MM-YYYY'}
					suffixIcon={
						<IoCalendarOutline style={{ color: token.colorPrimary }} />
					}
					style={{
						borderColor: token.colorPrimary,
						color: token.colorPrimary,
					}}
					onChange={handleDateChanged}
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
					disabled={disabledButton}
					style={!disabledButton ? enabledStyles : disabledStyles}
					icon={<PlayCircleOutlined />}
				>
					Start Back Testing
				</Button>
			</Flex>
		</Flex>
	)
}

export default Index
