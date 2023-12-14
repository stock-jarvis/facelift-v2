import { Flex } from 'antd'
import ActionSection from '../action-section'
import { savedIconsSections } from '../../../constants/data'
const BasketItem = () => {
	return (
		<Flex flex="1">
			<Flex
				flex="1"
				align="center"
				className="p-[10px] border-y-[1px] border-l-[1px] border-solid "
			>
				<p className="font-bold">Apple</p>
			</Flex>
			<ActionSection actions={savedIconsSections} />
		</Flex>
	)
}
export default BasketItem
