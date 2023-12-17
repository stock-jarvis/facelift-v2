import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Flex, Modal, ModalProps, Select, Statistic } from 'antd'

import { Outcome } from 'src/common/enums'
import AlertsTable from './alerts-table'

type AlertsModalProps = Pick<ModalProps, 'onCancel'>

// TODO: Wire up
// eslint-disable-next-line prefer-const
let profitAndLoss = 1000

const AlertsModal: React.FC<AlertsModalProps> = ({ onCancel }) => {
	const outcome =
		profitAndLoss === 0
			? Outcome.NoChange
			: profitAndLoss > 0
				? Outcome.Profit
				: Outcome.Loss

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

					<Statistic
						title={outcome}
						value={profitAndLoss}
						precision={2}
						valueStyle={{
							color: outcome === Outcome.Loss ? '#cf1322' : '#3f8600',
						}}
						prefix={
							outcome === Outcome.Loss ? (
								<ArrowDownOutlined />
							) : (
								<ArrowUpOutlined />
							)
						}
						suffix="%"
					/>
				</Flex>
				<AlertsTable />
			</Flex>
		</Modal>
	)
}

export default AlertsModal
