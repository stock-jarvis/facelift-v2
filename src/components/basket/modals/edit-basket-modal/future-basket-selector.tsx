import { Flex } from 'antd'
import Instrument from './instrument'
import ActionSelector from './action-selector'
import PositionHolder from './position-holder'
import QuantityInput from './quantity-input'
import ExpirySelector from './expiry-selector'
const FutureBasketSelector = () => {
	return (
		<PositionHolder heading="Future">
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
