import { Button, Tooltip } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useToggle } from 'src/common/utils/state-utils'
import InstrumentSelectionModal from './instrument-selection-modal'

const InstrumentSelection = () => {
	const [isInstrumentSelectionModalOpen, toggleIsInstrumentSelectionModalOpen] =
		useToggle()

	return (
		<>
			<Tooltip title="Search and Select Instruments">
				<Button
					shape="circle"
					icon={<SearchOutlined />}
					onClick={toggleIsInstrumentSelectionModalOpen}
				/>
			</Tooltip>

			{isInstrumentSelectionModalOpen && (
				<InstrumentSelectionModal
					open={isInstrumentSelectionModalOpen}
					onCancel={toggleIsInstrumentSelectionModalOpen}
				/>
			)}
		</>
	)
}

export default InstrumentSelection
