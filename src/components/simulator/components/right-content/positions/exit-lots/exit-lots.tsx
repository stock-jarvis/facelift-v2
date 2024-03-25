import { Button, Tooltip } from 'antd'
import { RxExit } from 'react-icons/rx'
import { useToggle } from 'src/common/utils/state-utils'
import ExitLotsModal from './exit-lots-modal'

interface Props {
	onExit: () => void
}

const ExitLots: React.FC<Props> = ({ onExit }) => {
	const [isExitLotsModalOpen, toggleIsExitLotsModalOpen] = useToggle()

	const handleOnOk = () => {
		onExit()
		toggleIsExitLotsModalOpen()
	}

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
					onOk={handleOnOk}
				/>
			)}
		</>
	)
}

export default ExitLots
