import { Flex, Radio, RadioGroupProps } from 'antd'

import { useSimulatorParamsStore } from '../../store/simulator-params-store'
import InstrumentDayDetail from './instrument-day-detail'
import DerivatiesParamSelection from './derivatives-param-selection'
import OptionStrikeTable from './option-strike-table'

const LeftContent = () => {
	const { selectedInstruments, activeInstrument, setActiveInstrument } =
		useSimulatorParamsStore()

	const handleChangeExchange: RadioGroupProps['onChange'] = (event) =>
		setActiveInstrument(event.target.value)

	return (
		<Flex className="w-full" gap="large" vertical>
			<Radio.Group
				value={activeInstrument}
				className="flex flex-row"
				buttonStyle="solid"
				onChange={handleChangeExchange}
			>
				{selectedInstruments.map((instrument) => (
					<Radio.Button
						className="w-full text-center"
						key={instrument}
						value={instrument}
					>
						{instrument}
					</Radio.Button>
				))}
			</Radio.Group>
			<InstrumentDayDetail />
			<DerivatiesParamSelection />
			<OptionStrikeTable />
		</Flex>
	)
}

export default LeftContent
