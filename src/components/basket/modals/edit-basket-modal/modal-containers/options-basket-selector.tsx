import { Flex } from 'antd'
import { TradeOptions } from '../../../types/types'
import { OptionObject } from '../../../types/types'
import StrikeRadioSelector from '../modal-components/strike-radio-selector'
import PositionHolder from './position-holder'
import StrikeSelector from '../modal-components/strike-selector'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ExpirySelector from '../modal-components/expiry-selector'
import ActionSelector from '../modal-components/action-selector'
interface BasketProps {
	handleAddBasket: (val: string) => void
	handleBaseTradeChange: (val: string) => void
	handleBaseActionChange: (val: string) => void
	handleBaseOptionChange: (val: string) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseSubTradeChange: (val: string) => void
	handleBaseQuantityChange: (value: number) => void
	handleBaseTradeValueChange: (val: number) => void
	handleBaseSubTradeListChange: (val: TradeOptions[]) => void
	baseInstrumentValue: string
	baseTradeValue: number
	baseActionValue: string
	baseOptionValue: string
	baseTradeOption: string
	optionExpiryList: OptionObject[]
	baseQuantityValue: number
	baseSubTradeOption: string
	optionExpiryBaseValue: string
	baseSubTradeOptionList: TradeOptions[]
}
const OptionsBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseOptionChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
	handleBaseTradeChange,
	handleBaseSubTradeChange,
	handleBaseSubTradeListChange,
	handleBaseTradeValueChange,
	baseTradeValue,
	optionExpiryBaseValue,
	baseInstrumentValue,
	baseQuantityValue,
	baseActionValue,
	optionExpiryList,
	baseOptionValue,
	baseTradeOption,
	baseSubTradeOption,
	baseSubTradeOptionList,
}: BasketProps) => {
	return (
		<PositionHolder
			heading="Options"
			basketType="options"
			onClick={handleAddBasket}
		>
			<Flex flex="1" vertical gap="middle">
				<Flex flex="1">
					<StrikeRadioSelector
						tradeOption={baseTradeOption}
						setTradeOption={handleBaseTradeChange}
						setSubTradeOptionList={handleBaseSubTradeListChange}
						setSubTradeOption={handleBaseSubTradeChange}
					/>
				</Flex>
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
					<ActionSelector
						label="Option Type"
						action1="CE"
						action2="PE"
						color1="black"
						color2="purple"
						baseActionValue={baseOptionValue}
						handleBaseActionChange={handleBaseOptionChange}
					/>
					<StrikeSelector
						tradeOption={baseTradeOption}
						tradeValue={baseTradeValue}
						setTradeValue={handleBaseTradeValueChange}
						setTradeOption={handleBaseTradeChange}
						subTradeOption={baseSubTradeOption}
						setSubTradeOption={handleBaseSubTradeChange}
						subTradeOptionList={baseSubTradeOptionList}
						setSubTradeOptionList={handleBaseSubTradeListChange}
					/>
					<QuantityInput
						baseQuantityValue={baseQuantityValue}
						handleQantityChange={handleBaseQuantityChange}
					/>
					<ExpirySelector
						handleExpiryChange={handleBaseExpiryChange}
						expiryValue={optionExpiryBaseValue}
						expiryOptions={optionExpiryList}
					/>
				</Flex>
			</Flex>
		</PositionHolder>
	)
}

export default OptionsBasketSelector
