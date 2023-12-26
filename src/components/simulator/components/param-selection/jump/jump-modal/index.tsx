import { Flex, Form, Input, Modal, ModalProps, Select, Typography } from 'antd'

import JumpTable from './jump-table'

type JumpModalProps = Pick<ModalProps, 'onCancel'>

const JumpModal: React.FC<JumpModalProps> = ({ onCancel }) => {
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
				<JumpTable />
			</Flex>
		</Modal>
	)
}

export default JumpModal
