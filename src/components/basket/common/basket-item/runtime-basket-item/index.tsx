import { Flex, Checkbox, theme } from 'antd'
import NameSection from './name-section'
import ActionSection from '../action-section'
import { iconsSections } from '../../../constants/data'
interface RuntimeBasketItemProps {
	handleOnClickAction: (id: string, actionType: string) => void
	exchange: string
	name: string
	id: string
}
const BasketItem = ({
	exchange,
	name,
	id,
	handleOnClickAction,
}: RuntimeBasketItemProps) => {
	const { token } = theme.useToken()

	const handleActionClicked = (actionType: string) => {
		handleOnClickAction(id, actionType)
	}

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
			<ActionSection
				actions={iconsSections}
				handleActionClicked={handleActionClicked}
			/>
		</Flex>
	)
}
export default BasketItem
