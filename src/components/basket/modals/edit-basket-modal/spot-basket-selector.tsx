import { Flex } from 'antd'
import Instrument from './instrument'
import ActionSelector from './action-selector'
import PositionHolder from './position-holder'
import QuantityInput from './quantity-input'

const SpotBasketSelector = () => {
	return (
		<PositionHolder heading="Spot">
			<Flex flex={1} align="center">
				<Flex flex={1} justify="center">
					<Instrument />
				</Flex>
				<Flex flex={1} justify="center">
					<ActionSelector
						label="Action Type"
						action1="B"
						action2="S"
						color1="green"
						color2="red"
					/>
				</Flex>
				<Flex flex={1} justify="center">
					<QuantityInput />
				</Flex>
			</Flex>
		</PositionHolder>
	)
}

export default SpotBasketSelector
