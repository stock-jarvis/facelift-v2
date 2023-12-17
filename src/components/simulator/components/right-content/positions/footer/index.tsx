import { Button, Flex } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

import { PositionsAntdTableProps } from '../positions-table'
import SaveSimulation from './save-simulation'
import Alerts from './alerts'

const renderFooter: PositionsAntdTableProps['footer'] = () => {
	return (
		<Flex justify="space-between">
			<Button type="primary" icon={<SaveOutlined />}>
				Saved Simulations
			</Button>

			<Alerts />

			<SaveSimulation />
		</Flex>
	)
}

export default renderFooter
