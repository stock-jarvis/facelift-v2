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
	handleBaseQuantityChange: (value: number) => void
	handleBaseActionChange: (val: string) => void
	handleBaseOptionChange: (val: string) => void
	handleBaseExpiryChange: (val: string) => void
	handleBaseTradeChange: (val: string) => void
	handleBaseSubTradeChange: (val: string) => void
	handleBaseSubTradeListChange: (val: TradeOptions[]) => void
	baseQuantityValue: number
	baseActionValue: string
	baseOptionValue: string
	optionExpiryList: OptionObject[]
	optionExpiryBaseValue: string
	baseTradeOption: string
	baseSubTradeOption: string
	baseSubTradeOptionList: TradeOptions[]
}
const OptionsBasketSelector = ({
	handleAddBasket,
	handleBaseQuantityChange,
	handleBaseOptionChange,
	handleBaseActionChange,
	handleBaseExpiryChange,
	optionExpiryBaseValue,
	baseQuantityValue,
	baseActionValue,
	optionExpiryList,
	baseOptionValue,
	handleBaseTradeChange,
	handleBaseSubTradeChange,
	handleBaseSubTradeListChange,
	baseTradeOption,
	baseSubTradeOption,
	baseSubTradeOptionList,
}: BasketProps) => {
	//const { token } = theme.useToken()

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
