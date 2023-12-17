import { Flex } from 'antd'
import { useState, useEffect } from 'react'
import { TradeOptions } from '../../../types/types'
import { tradeTypeData } from '../../../constants/data'
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
	baseQuantityValue: number
	baseActionValue: string
	baseOptionValue: string
	optionExpiryList: OptionObject[]
	optionExpiryBaseValue: string
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
}: BasketProps) => {
	//const { token } = theme.useToken()
	const [tradeOption, setTradeOption] = useState<string>('')
	const [subTradeOption, setSubTradeOption] = useState<string>('')
	const [subTradeOptionList, setSubTradeOptionList] = useState<TradeOptions[]>(
		[]
	)

	useEffect(() => {
		if (!tradeOption) {
			setTradeOption(tradeTypeData[0].value)
			setSubTradeOptionList(tradeTypeData[0].children)
			setSubTradeOption(tradeTypeData[0].children[0].value)
		}
	}, [tradeOption])

	return (
		<PositionHolder
			heading="Options"
			basketType="options"
			onClick={handleAddBasket}
		>
			<Flex flex="1" vertical gap="middle">
				<Flex flex="1">
					<StrikeRadioSelector
						tradeOption={tradeOption}
						setTradeOption={setTradeOption}
						setSubTradeOptionList={setSubTradeOptionList}
						setSubTradeOption={setSubTradeOption}
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
						tradeOption={tradeOption}
						setTradeOption={setTradeOption}
						subTradeOption={subTradeOption}
						setSubTradeOption={setSubTradeOption}
						subTradeOptionList={subTradeOptionList}
						setSubTradeOptionList={setSubTradeOptionList}
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
