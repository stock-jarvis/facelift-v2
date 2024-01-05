import { Input, InputRef, Modal, ModalProps } from 'antd'
import { useRef } from 'react'

type SaveSimulationModal = Pick<ModalProps, 'open' | 'onCancel'>

const SaveSimulationModal: React.FC<SaveSimulationModal> = ({
	open,
	onCancel,
}) => {
	const inputRef = useRef<InputRef>(null)

	const handleSaveSelection = () => {
		console.log(inputRef.current?.input?.value)
	}

	return (
		<Modal
			open={open}
			title="Save simulation"
			okText="Save"
			onOk={handleSaveSelection}
			onCancel={onCancel}
		>
			<Input ref={inputRef} placeholder="Enter name of simulation" />
		</Modal>
	)
}

export default SaveSimulationModal
