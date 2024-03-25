import { Modal, ModalProps } from 'antd'

type ExitLotsModal = Pick<ModalProps, 'open' | 'onCancel' | 'onOk'>

const ExitLotsModal: React.FC<ExitLotsModal> = ({ open, onCancel, onOk }) => {
	return (
		<Modal
			open={open}
			title="Exit lots"
			// TODO: Check button text
			okText="Exit lots"
			onOk={onOk}
			onCancel={onCancel}
		>
			{/* // TODO: Implement exit lots */}
		</Modal>
	)
}

export default ExitLotsModal
