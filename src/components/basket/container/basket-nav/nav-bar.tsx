import { Flex, Button, DatePicker, theme } from 'antd'
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { IoCalendarOutline } from 'react-icons/io5'
import AddBasketModal from '../../modals/add-new-basket'
import { TimeRangePickerProps } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import { useBasketStore } from '../../store/basket-store'
import { format } from '../../utils/date-format'
import dayjs, { Dayjs } from 'dayjs'
import { RunBasketAPI } from 'src/api/AuthService'

const { RangePicker } = DatePicker
interface BasketNavProps {
	setSelectedRowKeys: (key: React.Key[]) => void
}
const BasketNav: React.FC<BasketNavProps> = ({ setSelectedRowKeys }) => {
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
		console.log({ startDate, endDate, selectedBaskets }, startDate.isValid())
		return (
			startDate.isValid() && endDate.isValid() && selectedBaskets.length > 0
		)
	}, [startDate, endDate, selectedBaskets])

	useEffect(() => {
		console.log({ selectedBaskets })
	}, [selectedBaskets])

	const handleDateChanged: TimeRangePickerProps['onChange'] = (e) => {
		const [startDate, endDate] = e ?? ['', '']
		handleDateChange(dayjs(startDate), dayjs(endDate))
	}

	const getFormattedDate = (day: Dayjs): string => {
		const d = day.toDate()
		let date: string | number = d.getDate()
		date = date < 10 ? `0${date}` : date
		let month: string | number = d.getMonth() + 1
		month = month < 10 ? `0${month}` : month
		const year = d.getFullYear()
		return `${date}-${month}-${year}`
	}

	const handleBackTestingButtonClicked = async () => {
		const sDate = getFormattedDate(startDate)
		const eDate = getFormattedDate(endDate)
		const res = []
		for (let i = 0; i < selectedBaskets.length; i++) {
			const name = selectedBaskets[i]?.Name
			res.push(RunBasketAPI(name))
		}
		const data = await Promise.all(res)
		console.log({ data })
		setSelectedRowKeys([])
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
