import {
	Flex,
	TimePicker,
	DatePicker,
	DatePickerProps,
	TimePickerProps,
} from 'antd'

import Jump from './jump'
import Randomize from './randomize'
import TimeMachine from './time-machine'

import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import ExchangeSelection from './exchange-selection'
import { DATE_TEMPLATE_WITH_DAY } from 'src/common/utils/date-time-utils'

const ParamSelection = () => {
	const { date, time, setDate, setTime } = useSimulatorParamsStore()

	const handleDateChange: DatePickerProps['onChange'] = (date) => setDate(date!)

	const handleTimeChange: TimePickerProps['onChange'] = (time) => setTime(time!)

	return (
		<>
			<Flex justify="space-between" align="center">
				<ExchangeSelection />

				<DatePicker
					value={date}
					format={DATE_TEMPLATE_WITH_DAY}
					allowClear={false}
					onChange={handleDateChange}
					style={{
						width: '150px',
					}}
				/>

				<TimePicker
					value={time}
					allowClear={false}
					onChange={handleTimeChange}
					style={{
						width: '110px',
					}}
				/>

				<TimeMachine />
				{/* Dummy Div to center time machine. Remove after adding new option */}
				<div></div>
				<Jump />

				<Randomize />
			</Flex>
		</>
	)
}

export default ParamSelection
