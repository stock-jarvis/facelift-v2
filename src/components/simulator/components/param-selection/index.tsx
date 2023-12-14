import {
	Flex,
	Radio,
	TimePicker,
	DatePicker,
	RadioGroupProps,
	DatePickerProps,
	TimePickerProps,
} from 'antd'

import InstrumentSelection from './instrument-selection'

import { availableExchanges } from '../../constants'
import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import Jump from './jump'
import Randomize from './randomize'
import TimeMachine from './time-machine'

const ParamSelection = () => {
	const { date, time, exchange, setDate, setTime, setExchange } =
		useSimulatorParamsStore()

	const handleChangeExchange: RadioGroupProps['onChange'] = (event) =>
		setExchange(event.target.value)

	const handleDateChange: DatePickerProps['onChange'] = (date) => setDate(date!)

	const handleTimeChange: TimePickerProps['onChange'] = (time) => setTime(time!)

	return (
		<>
			<Flex justify="space-between" align="center">
				<Radio.Group
					value={exchange}
					buttonStyle="solid"
					onChange={handleChangeExchange}
				>
					{availableExchanges.map((exchange) => (
						<Radio.Button key={exchange} value={exchange}>
							{exchange}
						</Radio.Button>
					))}
				</Radio.Group>

				<InstrumentSelection />

				<Randomize />

				<TimeMachine />

				<DatePicker
					value={date}
					allowClear={false}
					onChange={handleDateChange}
				/>

				<TimePicker
					value={time}
					allowClear={false}
					onChange={handleTimeChange}
				/>

				<Jump />
			</Flex>
		</>
	)
}

export default ParamSelection
