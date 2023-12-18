import { Flex } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import PositionHolder from './position-holder'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
interface BasketProps {
	futureExpiryList: OptionObject[]
	futureExpiryBaseValue: string
	baseQuantityValue: number
	baseActionValue: string
	baseInstrumentValue: string
	handleAddBasket: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
}
const FutureBasketSelector = ({
	baseActionValue,
	baseQuantityValue,
	baseInstrumentValue,
	futureExpiryBaseValue,
	futureExpiryList,
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
}: BasketProps) => {
	return (
		<PositionHolder
			heading="Future"
			basketType="future"
			onClick={handleAddBasket}
		>
			<Flex flex={1} justify="space-around" align="center">
				<Instrument instrument={baseInstrumentValue} />
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
