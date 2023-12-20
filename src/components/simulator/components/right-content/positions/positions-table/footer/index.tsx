import { Flex } from 'antd'

import { PositionsAntdTableProps } from '..'
import SaveSimulation from './save-simulation'
import Alerts from './alerts'
import SavedSimulations from './saved-simlations'

const renderFooter: PositionsAntdTableProps['footer'] = () => {
	return (
		<Flex justify="space-between" align="center">
			<SavedSimulations />

			<Alerts />

			<SaveSimulation />
		</Flex>
	)
}

export default renderFooter
