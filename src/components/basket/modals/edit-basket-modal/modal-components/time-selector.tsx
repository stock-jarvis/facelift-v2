import { Flex, Select, theme, Typography } from 'antd'
const { Text } = Typography
import { TimeHours, Time } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
import {
	mxcTimes,
	nseTimes,
	curTimes,
} from 'src/components/basket/constants/entry-exit-time'
interface TimeSelectorProps {
	label: string
	hours: TimeHours[] | undefined
	minutes: Time[] | undefined
	currentHour: number | undefined
	currentMinute: number | undefined
	exchange: string | undefined
	handleMinuteListChange: (val: Time[]) => void
	handleChangeCurrentHour: (val: number) => void
	handleChangeCurrentMinute: (val: number) => void
}
const TimeSelector = ({
	label,
	hours,
	minutes,
	exchange,
	currentHour,
	currentMinute,
	handleChangeCurrentHour,
	handleChangeCurrentMinute,
	handleMinuteListChange,
}: TimeSelectorProps) => {
	const { token } = theme.useToken()

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

	return (
		<Flex flex={1} gap="middle" align="center" justify="center">
			<Text
				style={{
					fontSize: token.fontSizeLG,
					fontWeight: token.fontWeightStrong,
				}}
			>
				{label}
			</Text>
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
	)
}

export default TimeSelector
