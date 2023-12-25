import { Flex, theme } from 'antd'

import LeftContent from './components/left-content'
import RightContent from './components/right-content'
import ParamSelection from './components/param-selection'

const Simulator = () => {
	const { token } = theme.useToken()
	return (
		<Flex
			vertical
			className="w-full h-full"
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
				<Flex
					className="w-2/3 h-full pl-6"
					style={{
						/** To align the lines of menu in right content and tabs in left content */
						marginTop: '-7px',
					}}
				>
					<RightContent />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Simulator
