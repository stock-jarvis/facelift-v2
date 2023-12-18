import { Flex, Checkbox, theme } from 'antd'
import NameSection from './name-section'
import ActionSection from '../action-section'
import { iconsSections } from '../../../constants/data'
interface RuntimeBasketItemProps {
	exchange: string
	name: string
}
const BasketItem = ({ exchange, name }: RuntimeBasketItemProps) => {
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
				className="border-[1px] select-none"
			>
				<Checkbox />
			</Flex>
			<NameSection exchange={exchange} name={name} />
			<ActionSection actions={iconsSections} />
		</Flex>
	)
}
export default BasketItem
