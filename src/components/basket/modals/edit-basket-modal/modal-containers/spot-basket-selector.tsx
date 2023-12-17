import { Flex } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
interface BasketProps {
	handleAddBasket: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseActionChange: (val: string) => void
	baseQuantityValue: number
	baseActionValue: string
}
const SpotBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	baseQuantityValue,
	baseActionValue,
}: BasketProps) => {
	return (
		<PositionHolder heading="Spot" onClick={handleAddBasket} basketType="spot">
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
						baseActionValue={baseActionValue}
						handleBaseActionChange={handleBaseActionChange}
					/>
				</Flex>
				<Flex flex={1} justify="center">
					<QuantityInput
						baseQuantityValue={baseQuantityValue}
						handleQantityChange={handleBaseQuantityChange}
					/>
				</Flex>
			</Flex>
		</PositionHolder>
	)
}

export default SpotBasketSelector
