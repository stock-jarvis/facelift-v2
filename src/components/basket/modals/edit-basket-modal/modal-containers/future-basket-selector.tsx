import { Flex } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
interface BasketProps {
	handleAddBasket: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
	futureExpiryList: OptionObject[]
	futureExpiryBaseValue: string
	baseQuantityValue: number
	baseActionValue: string
}
const FutureBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
	baseActionValue,
	baseQuantityValue,
	futureExpiryBaseValue,
	futureExpiryList,
}: BasketProps) => {
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
					baseActionValue={baseActionValue}
					handleBaseActionChange={handleBaseActionChange}
				/>

				<QuantityInput
					baseQuantityValue={baseQuantityValue}
					handleQantityChange={handleBaseQuantityChange}
				/>
				<ExpirySelector
					handleExpiryChange={handleBaseExpiryChange}
					expiryValue={futureExpiryBaseValue}
					expiryOptions={futureExpiryList}
				/>
			</Flex>
		</PositionHolder>
	)
}

export default FutureBasketSelector
