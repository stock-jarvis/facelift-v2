import {
	Flex,
	TimePicker,
	DatePicker,
	DatePickerProps,
	TimePickerProps,
	Button,
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
				<Flex flex={1} justify="space-between">
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
				</Flex>

				<Flex flex={1} justify="center">
					<TimeMachine />
				</Flex>

				<Flex flex={1} justify="space-between">
					<Jump />

					<Button type="primary">Quarterly Results</Button>

					<Randomize />
				</Flex>
			</Flex>
		</>
	)
}

export default ParamSelection
