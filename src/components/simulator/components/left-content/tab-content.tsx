import { Flex } from 'antd'

import DerivativesTable from './derivatives-table'
import InstrumentDayDetail from './instrument-day-detail'
import DerivatiesParamSelection from './derivatives-param-selection'

type TabContentProps = {
	instrument: string
}

// TODO: use instrument prop and display data based on it.
const TabContent: React.FC<TabContentProps> = () => {
	return (
		<Flex className="w-full" gap="large" vertical>
			{/* <Radio.Group
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
			</Radio.Group> */}
			<InstrumentDayDetail />
			<DerivatiesParamSelection />
			<DerivativesTable />
		</Flex>
	)
}

export default TabContent
