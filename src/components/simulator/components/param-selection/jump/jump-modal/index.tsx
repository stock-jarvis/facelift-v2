import { Modal, ModalProps } from 'antd'

type JumpModalProps = Pick<ModalProps, 'onCancel'>

const JumpModal: React.FC<JumpModalProps> = ({ onCancel }) => {
	// TODO: Implement Jump Modal
	return <Modal open={true} onCancel={onCancel}></Modal>
}

export default JumpModal
