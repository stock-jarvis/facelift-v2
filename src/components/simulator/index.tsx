import { Flex, theme } from 'antd'

import LeftContent from './components/left-content'
import ParamSelection from './components/param-selection'
import RightContent from './components/right-content'

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
			<Flex className="h-full">
				<Flex className="w-1/3 h-full">
					<LeftContent />
				</Flex>
				<Flex className="w-2/3 h-full pl-6">
					<RightContent />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Simulator
