import { Button, Flex, Radio, RadioGroupProps, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { availableExchanges } from '../constants'
import { useSimulatorParamsStore } from '../store/simulator-params-store'
import { useToggle } from 'src/common/utils/state-utils'
import InstrumentSelectionModal from './instrument-selection-modal'

const ParamSelector = () => {
	const { exchange, setExchange } = useSimulatorParamsStore()

	const [isInstrumentSelectionModalOpen, toggleIsInstrumentSelectionModalOpen] =
		useToggle()

	const handleChangeExchange: RadioGroupProps['onChange'] = (event) =>
		setExchange(event.target.value)

	return (
		<>
			<Flex gap={36}>
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

				<Tooltip title="Search and Select Instruments">
					<Button
						shape="circle"
						icon={<SearchOutlined />}
						onClick={toggleIsInstrumentSelectionModalOpen}
					/>
				</Tooltip>
			</Flex>
			{isInstrumentSelectionModalOpen && (
				<InstrumentSelectionModal
					open={isInstrumentSelectionModalOpen}
					onCancel={toggleIsInstrumentSelectionModalOpen}
				/>
			)}
		</>
	)
}

export default ParamSelector
