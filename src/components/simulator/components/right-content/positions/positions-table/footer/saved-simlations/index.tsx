import { SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useToggle } from 'src/common/utils/state-utils'
import SavedSimulationsModal from './saved-simulations-modal'

const SavedSimulations = () => {
	const [isSavedSimulationsModalOpen, toggleSavedSimulationsModalOpen] =
		useToggle()

	return (
		<>
			<Button
				type="primary"
				onClick={toggleSavedSimulationsModalOpen}
				icon={<SaveOutlined />}
			>
				Saved Simulations
			</Button>
			{isSavedSimulationsModalOpen && (
				<SavedSimulationsModal onCancel={toggleSavedSimulationsModalOpen} />
			)}
		</>
	)
}

export default SavedSimulations
