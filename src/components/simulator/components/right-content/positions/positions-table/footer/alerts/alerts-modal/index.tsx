import { Flex, Form, Input, Modal, ModalProps, Select, Typography } from 'antd'

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
				<Flex
					style={{ width: '100%' }}
					align="flex-start"
					justify="space-between"
				>
					<Form.Item
						label={<Typography.Text type="danger">Total Loss</Typography.Text>}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label={
							<Typography.Text type="success">Total Profit</Typography.Text>
						}
					>
						<Input />
					</Form.Item>
					<Select placeholder="Select instrument" />
				</Flex>
				<AlertsTable />
			</Flex>
		</Modal>
	)
}

export default AlertsModal
