import { SaveOutlined } from '@ant-design/icons'
import { useToggle } from 'src/common/utils/state-utils'
import SavedSimulationsModal from './saved-simulations-modal'
import Button from 'src/common/components/button'

const SavedSimulations = () => {
	const [isSavedSimulationsModalOpen, toggleSavedSimulationsModalOpen] =
		useToggle()

	return (
		<>
			<Button
				type="primary-bordered"
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
