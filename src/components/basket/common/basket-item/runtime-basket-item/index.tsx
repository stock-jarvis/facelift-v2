import { Flex, Checkbox, theme } from 'antd'
import NameSection from './name-section'
import ActionSection from '../action-section'
import { iconsSections } from '../../../constants/data'
const BasketItem = () => {
	const { token } = theme.useToken()
	return (
		<Flex flex="1">
			<Flex
				align="center"
				style={{
					padding: token.paddingXS,
					borderRight: '0',
					boxSizing: 'content-box',
				}}
				className="border-[1px]"
			>
				<Checkbox />
			</Flex>
			<NameSection name={'NSE'} />
			<ActionSection actions={iconsSections} />
		</Flex>
	)
}
export default BasketItem
