import { SaveOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

import { useToggle } from 'src/common/utils/state-utils'
import Button from 'src/common/components/button'
import SaveSimulationModal from './save-simulation-modal'

const SaveSimulation = () => {
	const [isSaveSimulationModalOpen, toggleIsSaveSimulationModalOpen] =
		useToggle()

	return (
		<>
			<Tooltip title="Save simulation">
				<Button
					type="text-bordered"
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
