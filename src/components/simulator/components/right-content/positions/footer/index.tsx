import { Button, Flex, Space } from 'antd'
import { SaveOutlined, BellOutlined, PlusOutlined } from '@ant-design/icons'

import { PositionsAntdTableProps } from '../positions-table'
import SaveSimulation from './save-simulation'

const renderFooter: PositionsAntdTableProps['footer'] = () => {
	return (
		<Flex justify="space-between">
			<Button type="primary" icon={<SaveOutlined />}>
				Saved Simulations
			</Button>

			<Button type="link" icon={<PlusOutlined />}>
				<Space>
					Alerts <BellOutlined />
				</Space>
			</Button>
			<SaveSimulation />
		</Flex>
	)
}

export default renderFooter
