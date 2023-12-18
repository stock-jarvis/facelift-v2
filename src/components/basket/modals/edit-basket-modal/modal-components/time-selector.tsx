import { Flex, Select, theme, Typography } from 'antd'
const { Text } = Typography
import { TimeHours, Time } from 'src/components/basket/types/types'
import { SelectProps } from 'antd'
interface TimeSelectorProps {
	label: string
	hours: TimeHours[] | undefined
	minutes: Time[] | undefined
	currentHour: number | undefined
	currentMinute: number | undefined
	handleMinuteListChange: (val: Time[]) => void
	handleChangeCurrentHour: (val: number) => void
	handleChangeCurrentMinute: (val: number) => void
}
const TimeSelector = ({
	label,
	hours,
	minutes,
	currentHour,
	currentMinute,
	handleChangeCurrentHour,
	handleChangeCurrentMinute,
	handleMinuteListChange,
}: TimeSelectorProps) => {
	const { token } = theme.useToken()

	const handleHourChange: SelectProps['onChange'] = (value: number) => {
		handleMinuteListChange
		handleChangeCurrentMinute
		handleChangeCurrentHour(value)
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
