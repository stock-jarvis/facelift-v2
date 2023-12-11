import { Flex } from 'antd'

import ParamSelector from './param-selector'

const Simulator = () => {
	return (
		<Flex
			vertical
			style={{
				padding: '16px 48px',
			}}
		>
			<ParamSelector />
		</Flex>
	)
}

export default Simulator
