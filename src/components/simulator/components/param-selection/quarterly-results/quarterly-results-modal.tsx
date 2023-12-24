import { Modal } from 'antd'
import { useSimulatorParamsStore } from 'src/components/simulator/store/simulator-params-store'

type QuarterlyResultsModalProps = {
	onCancel: () => void
}

// TODO
const QuarterlyResultsModal: React.FC<QuarterlyResultsModalProps> = ({
	onCancel,
}) => {
	const { activeInstrument } = useSimulatorParamsStore()

	return (
		<Modal
			title={`${activeInstrument} - Quarterly Results`}
			open={true}
			onCancel={onCancel}
		>
			Quarterly Results construction in progress
		</Modal>
	)
}

export default QuarterlyResultsModal
