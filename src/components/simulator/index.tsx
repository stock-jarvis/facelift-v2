import { Flex, theme } from 'antd'

import TimeMachine from './components/time-machine'
import LeftContent from './components/left-content'
import ParamSelection from './components/param-selection'

const Simulator = () => {
	const { token } = theme.useToken()

	return (
		<Flex
			vertical
			className="h-full"
			style={{
				padding: `${token.paddingContentVertical}px ${token.paddingContentHorizontalLG}px`,
			}}
			gap={token.margin}
		>
			<ParamSelection />
			<TimeMachine />
			<Flex className="h-full">
				<Flex className="w-1/4 h-full">
					<LeftContent />
				</Flex>
				<Flex className="w-3/4 h-full pl-6">Charts</Flex>
			</Flex>
		</Flex>
	)
}

export default Simulator
