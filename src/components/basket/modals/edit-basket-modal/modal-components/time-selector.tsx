import {
	Flex,
	Select,
	theme,
	Typography,
	Descriptions,
	DescriptionsProps,
} from 'antd'
const { Text } = Typography
import { TimeHours, Time } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
//import { useBasketStore } from 'src/components/basket/store/basket-store'
import {
	mxcTimes,
	nseTimes,
	curTimes,
} from 'src/components/basket/constants/entry-exit-time'
interface TimeSelectorProps {
	label: string
	hours: TimeHours[] | undefined
	minutes: Time[] | undefined
	currentHour: number
	currentMinute: number | undefined
	exchange: string | undefined
	handleMinuteListChange: (val: Time[]) => void
	handleChangeCurrentHour: (val: number) => void
	handleChangeCurrentMinute: (val: number) => void
}
const TimeSelector: React.FC<TimeSelectorProps> = ({
	label,
	hours,
	minutes,
	exchange,
	currentHour,
	currentMinute,
	handleChangeCurrentHour,
	handleChangeCurrentMinute,
	handleMinuteListChange,
}) => {
	const { token } = theme.useToken()
	//const { timeError } = useBasketStore()
	const handleHourChange: SelectProps['onChange'] = (value: number) => {
		handleChangeCurrentHour(value)
		if (exchange === 'MCX') {
			const dataIndex = mxcTimes.findIndex((time) => time.value === value)
			if (dataIndex !== -1) {
				handleMinuteListChange(mxcTimes[dataIndex].minutes)
				handleChangeCurrentMinute(mxcTimes[dataIndex].minutes[0].value)
			}
		} else if (exchange === 'NSE') {
			const dataIndex = nseTimes.findIndex((time) => time.value === value)
			if (dataIndex !== -1) {
				handleMinuteListChange(nseTimes[dataIndex].minutes)
				handleChangeCurrentMinute(nseTimes[dataIndex].minutes[0].value)
			}
		} else if (exchange === 'CUR') {
			const dataIndex = curTimes.findIndex((time) => time.value === value)
			if (dataIndex !== -1) {
				handleMinuteListChange(curTimes[dataIndex].minutes)
				handleChangeCurrentMinute(curTimes[dataIndex].minutes[0].value)
			}
		}
	}
	const handleMinuteChange: SelectProps['onChange'] = (value: number) => {
		handleChangeCurrentMinute(value)
	}

	const items: DescriptionsProps['items'] = [
		{
			label: (
				<Flex>
					<Text>{label}</Text>
				</Flex>
			),
			key: 'time_selector',
			children: (
				<Flex flex={1} gap="middle">
					<Select
						style={{ width: '100px' }}
						options={hours}
						value={currentHour}
						onChange={handleHourChange}
					/>
					<Text
						style={{
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{' '}
						:{' '}
					</Text>
					<Select
						style={{ width: '100px' }}
						options={minutes}
						value={currentMinute}
						onChange={handleMinuteChange}
					/>
				</Flex>
			),
		},
	]
	return <Descriptions bordered items={items} />
}

export default TimeSelector
