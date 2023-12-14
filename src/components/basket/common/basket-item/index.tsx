import { Flex } from 'antd'
import NameSection from './name-section'
import ActionSection from './action-section'
const BasketItem = () => {
	return (
		<Flex className="w-[50%]">
			<NameSection name={'NSE'} />
			<ActionSection />
		</Flex>
	)
}
export default BasketItem
