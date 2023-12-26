import { Flex } from 'antd'

import SaveSimulation from './save-simulation'
import SavedSimulations from './saved-simlations'

const Footer = () => {
	return (
		<Flex justify="space-between" align="center">
			<SavedSimulations />

			<SaveSimulation />
		</Flex>
	)
}

export default Footer
