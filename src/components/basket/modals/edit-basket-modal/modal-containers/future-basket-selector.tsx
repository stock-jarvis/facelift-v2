import { Flex } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
interface BasketProps {
	handleAddBasket: (val: string) => void
}
const FutureBasketSelector = ({ handleAddBasket }: BasketProps) => {
	return (
		<PositionHolder
			heading="Future"
			basketType="future"
			onClick={handleAddBasket}
		>
			<Flex flex={1} justify="space-around" align="center">
				<Instrument />
				<ActionSelector
					label="Action Type"
					action1="B"
					action2="S"
					color1="green"
					color2="red"
				/>

				<QuantityInput />
				<ExpirySelector />
			</Flex>
		</PositionHolder>
	)
}

export default FutureBasketSelector
