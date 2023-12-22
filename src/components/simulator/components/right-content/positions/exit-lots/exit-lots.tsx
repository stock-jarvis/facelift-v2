import { Button, Tooltip } from 'antd'
import { RxExit } from 'react-icons/rx'
import { useToggle } from 'src/common/utils/state-utils'
import ExitLotsModal from './exit-lots-modal'

const ExitLots = () => {
	const [isExitLotsModalOpen, toggleIsExitLotsModalOpen] = useToggle()

	return (
		<>
			<Tooltip title="Exit position">
				<Button
					size="large"
					type="text"
					shape="circle"
					icon={<RxExit />}
					onClick={toggleIsExitLotsModalOpen}
				/>
			</Tooltip>

			{isExitLotsModalOpen && (
				<ExitLotsModal
					open={isExitLotsModalOpen}
					onCancel={toggleIsExitLotsModalOpen}
				/>
			)}
		</>
	)
}

export default ExitLots
