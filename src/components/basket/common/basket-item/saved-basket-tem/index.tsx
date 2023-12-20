import { Flex } from 'antd'
import ActionSection from '../action-section'
import { savedIconsSections } from '../../../constants/data'
interface BasketItemProps {
	name: string
	identifier: number
}
const BasketItem = ({ name, identifier }: BasketItemProps) => {
	const onActionClicked = (val: string) => {
		console.log(name, identifier)
		console.log(val)
	}
	return (
		<Flex flex="1">
			<Flex
				flex="1"
				align="center"
				className="p-[10px] border-y-[1px] border-l-[1px] border-solid "
			>
				<p className="font-bold">
					{name} {identifier > 0 ? `- ${identifier}` : ''}
				</p>
			</Flex>
			<ActionSection
				handleActionClicked={onActionClicked}
				actions={savedIconsSections}
			/>
		</Flex>
	)
}
export default BasketItem
