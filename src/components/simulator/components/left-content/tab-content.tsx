import { Flex } from 'antd'
import { useState } from 'react'

import DerivativesTable from './derivatives-table'
import InstrumentDayDetail from './instrument-day-detail'
import DerivatiesParamSelection from './derivatives-param-selection'
import { DerivativesMetric } from 'src/common/enums'

type TabContentProps = {
	instrument: string
}

// TODO: use instrument prop and display data based on it.
const TabContent: React.FC<TabContentProps> = () => {
	const [selectedDerivativeMetric, setSelectedDerivativeMetric] =
		useState<DerivativesMetric>()

	return (
		<Flex className="w-full" gap="large" vertical>
			<InstrumentDayDetail />
			<DerivatiesParamSelection
				selectedDerivativeMetric={selectedDerivativeMetric}
				setSelectedDerivativeMetric={setSelectedDerivativeMetric}
			/>
			<DerivativesTable selectedDerivativeMetric={selectedDerivativeMetric} />
		</Flex>
	)
}

export default TabContent
