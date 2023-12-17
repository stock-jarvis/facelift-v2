import { BellOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'

import { useToggle } from 'src/common/utils/state-utils'
import AlertsModal from './alerts-modal'

const Alerts = () => {
	const [isAlertsModalOpen, toggleIsAlertsModalOpen] = useToggle()

	return (
		<>
			<Button
				type="link"
				onClick={toggleIsAlertsModalOpen}
				icon={<PlusOutlined />}
			>
				<Space>
					Alerts <BellOutlined />
				</Space>
			</Button>

			{isAlertsModalOpen && <AlertsModal onCancel={toggleIsAlertsModalOpen} />}
		</>
	)
}

export default Alerts
