import { Flex } from 'antd'
import { useState, useEffect } from 'react'
import { TradeOptions } from '../../types/types'
import { tradeTypeData } from '../../constants/data'
import StrikeRadioSelector from './strike-radio-selector'
import PositionHolder from './position-holder'
import StrikeSelector from './strike-selector'
import Instrument from './instrument'
import QuantityInput from './quantity-input'
import ExpirySelector from './expiry-selector'
import ActionSelector from './action-selector'

const OptionsBasketSelector = () => {
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
		<PositionHolder heading="Options">
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
					/>
					<ActionSelector
						label="Option Type"
						action1="CE"
						action2="PE"
						color1="black"
						color2="purple"
					/>
					<StrikeSelector
						tradeOption={tradeOption}
						setTradeOption={setTradeOption}
						subTradeOption={subTradeOption}
						setSubTradeOption={setSubTradeOption}
						subTradeOptionList={subTradeOptionList}
						setSubTradeOptionList={setSubTradeOptionList}
					/>
					<QuantityInput />
					<ExpirySelector />
				</Flex>
			</Flex>
		</PositionHolder>
	)
}

export default OptionsBasketSelector
