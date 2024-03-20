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
import {
	DATE_TEMPLATE_WITH_DAY,
	getDisabledTimeByExchange,
} from 'src/common/utils/date-time-utils'
import { useMemo } from 'react'
import QuarterlyResults from './quarterly-results/quarterly-results'
import { BANK_NIFTY_TICKER } from 'src/common/constants'
import useGetSpotData from 'src/api/simulator/hooks/use-get-spot-data'

const ParamSelection = () => {
	const { date, time, setDate, setTime, exchange } = useSimulatorParamsStore()

	const { data: spotData } = useGetSpotData(
		date,
		time,
		exchange,
		BANK_NIFTY_TICKER
	)

	const getDisabledTime = useMemo(
		() => getDisabledTimeByExchange(exchange),
		[exchange]
	)

	const handleDateChange: DatePickerProps['onChange'] = (date) => setDate(date!)

	const handleTimeChange: TimePickerProps['onChange'] = (time) => setTime(time!)

	return (
		<>
			<Flex justify="space-between" align="center">
				<Flex flex={1.3} justify="space-between">
					<ExchangeSelection />
					<Flex align="center">Bank Nifty ATM CE | PE IV : 29.56</Flex>

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
						disabledTime={getDisabledTime}
						hideDisabledOptions
						style={{
							width: '110px',
						}}
					/>
				</Flex>

				<Flex flex={1} justify="center">
					<TimeMachine />
				</Flex>

				<Flex flex={1.3} justify="space-between">
					<Jump />

					<Flex align="center">India VIX : {spotData?.Open ?? 'NIL'}</Flex>

					<QuarterlyResults />

					<Randomize />
				</Flex>
			</Flex>
		</>
	)
}

export default ParamSelection
