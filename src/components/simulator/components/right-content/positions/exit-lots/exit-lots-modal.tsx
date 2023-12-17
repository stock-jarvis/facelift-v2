import { Modal, ModalProps } from 'antd'

type ExitLotsModal = Pick<ModalProps, 'open' | 'onCancel'>

const ExitLotsModal: React.FC<ExitLotsModal> = ({ open, onCancel }) => {
	const handleExitLots = () => {}

	return (
		<Modal
			open={open}
			title="Exit lots"
			// TODO: Check button text
			okText="Exit lots"
			onOk={handleExitLots}
			onCancel={onCancel}
		>
			{/* // TODO: Implement exit lots */}
		</Modal>
	)
}

export default ExitLotsModal
