import { Flex, Modal, ModalProps, Select } from 'antd'

import AlertsTable from './alerts-table'

type AlertsModalProps = Pick<ModalProps, 'onCancel'>

const AlertsModal: React.FC<AlertsModalProps> = ({ onCancel }) => {
	return (
		<Modal
			open={true}
			width={1200}
			title="Set alerts"
			closable={false}
			onCancel={onCancel}
		>
			<Flex vertical>
				<Flex style={{ width: '100%' }} align="center" justify="space-between">
					<Select placeholder="Select instrument" />
				</Flex>
				<AlertsTable />
			</Flex>
		</Modal>
	)
}

export default AlertsModal
