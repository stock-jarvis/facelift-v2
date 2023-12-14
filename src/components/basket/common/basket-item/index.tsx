import { Flex, Checkbox } from 'antd'
import NameSection from './name-section'
import ActionSection from './action-section'
const BasketItem = () => {
	return (
		<Flex flex="1">
			<div className="flex items-center p-[10px] box-content border-solid border-[1px] border-r-[0px] border-black">
				<Checkbox />
			</div>
			<NameSection name={'NSE'} />
			<ActionSection />
		</Flex>
	)
}
export default BasketItem
