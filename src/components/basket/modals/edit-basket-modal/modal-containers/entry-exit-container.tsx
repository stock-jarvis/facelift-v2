import TimeSelector from '../modal-components/time-selector'
import { Flex, theme } from 'antd'
import { TimeHours, Time } from 'src/components/basket/types/types'
interface EntryExitProps {
	entryHoursData: TimeHours[] | undefined
	entryMinutesData: Time[] | undefined
	entryHourValue: number
	entryMinuteValue: number
	exitHoursData: TimeHours[] | undefined
	exitMinutesData: Time[] | undefined
	exitHourValue: number
	exitMinuteValue: number
	exchange: string | undefined
	handleExitMinuteListChange: (val: Time[]) => void
	handleEntryMinuteListChange: (val: Time[]) => void
	handleChangeExitHour: (val: number) => void
	handleChangeExitMinute: (val: number) => void
	handleChangeEntryMinute: (val: number) => void
	handleChangeEntryHour: (val: number) => void
}
const EntryExit = ({
	entryHoursData,
	entryMinutesData,
	entryHourValue,
	entryMinuteValue,
	exitHoursData,
	exitMinutesData,
	exitHourValue,
	exitMinuteValue,
	exchange,
	handleChangeExitHour,
	handleChangeExitMinute,
	handleChangeEntryMinute,
	handleChangeEntryHour,
	handleEntryMinuteListChange,
	handleExitMinuteListChange,
}: EntryExitProps) => {
	const { token } = theme.useToken()
	return (
		<Flex flex={1} justify="center">
			<Flex
				style={{
					width: '90%',
					backgroundColor: '#F1F8FF',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
					boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
				}}
			>
				<Flex flex={1} justify="center" align="center">
					<TimeSelector
						label={'Entry Time'}
						exchange={exchange}
						hours={entryHoursData}
						minutes={entryMinutesData}
						currentHour={entryHourValue}
						currentMinute={entryMinuteValue}
						handleChangeCurrentHour={handleChangeEntryHour}
						handleChangeCurrentMinute={handleChangeEntryMinute}
						handleMinuteListChange={handleEntryMinuteListChange}
					/>
				</Flex>
				<Flex flex={1} justify="center" align="center">
					<TimeSelector
						label={'Exit Time'}
						exchange={exchange}
						hours={exitHoursData}
						minutes={exitMinutesData}
						currentHour={exitHourValue}
						currentMinute={exitMinuteValue}
						handleMinuteListChange={handleExitMinuteListChange}
						handleChangeCurrentHour={handleChangeExitHour}
						handleChangeCurrentMinute={handleChangeExitMinute}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default EntryExit
