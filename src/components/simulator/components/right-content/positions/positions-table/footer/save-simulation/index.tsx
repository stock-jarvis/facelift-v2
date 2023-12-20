import { SaveOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

import { useToggle } from 'src/common/utils/state-utils'
import SaveSimulationModal from './save-simulation-modal'

const SaveSimulation = () => {
	const [isSaveSimulationModalOpen, toggleIsSaveSimulationModalOpen] =
		useToggle()

	return (
		<>
			<Tooltip title="Save simulation">
				<Button
					type="text"
					size="large"
					shape="circle"
					onClick={toggleIsSaveSimulationModalOpen}
					icon={<SaveOutlined />}
				/>
			</Tooltip>

			{isSaveSimulationModalOpen && (
				<SaveSimulationModal
					open={isSaveSimulationModalOpen}
					onCancel={toggleIsSaveSimulationModalOpen}
				/>
			)}
		</>
	)
}

export default SaveSimulation
