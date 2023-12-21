import { Flex } from 'antd'

import { PositionsAntdTableProps } from '..'
import SaveSimulation from './save-simulation'
import SavedSimulations from './saved-simlations'

const renderFooter: PositionsAntdTableProps['footer'] = () => {
	return (
		<Flex justify="space-between" align="center">
			<SavedSimulations />

			<SaveSimulation />
		</Flex>
	)
}

export default renderFooter
