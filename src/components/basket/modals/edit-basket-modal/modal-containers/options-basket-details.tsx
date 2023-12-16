import DetailBasketHolder from './detail-basket-holder'
import { Flex } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector from '../modal-components/strike-selector'
import { useState, useEffect } from 'react'
import { tradeTypeData } from 'src/components/basket/constants/data'
import { TradeOptions } from 'src/components/basket/types/types'
const OptionBasketDetail = () => {
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
		<DetailBasketHolder>
			<Flex className="h-fit">
				<Flex className="p-10">
					<Instrument />
				</Flex>

				<Flex vertical flex={1}>
					<Flex flex="1" justify="space-around">
						<Flex flex={1} justify="center">
							<ActionSelector
								label="Action Type"
								action1="B"
								action2="S"
								color1="green"
								color2="red"
							/>
						</Flex>
						<Flex flex={1}>
							<StrikeSelector
								tradeOption={tradeOption}
								setTradeOption={setTradeOption}
								subTradeOption={subTradeOption}
								setSubTradeOption={setSubTradeOption}
								subTradeOptionList={subTradeOptionList}
								setSubTradeOptionList={setSubTradeOptionList}
							/>
						</Flex>
						<Flex flex={1}>
							<QuantityInput />
						</Flex>
						<Flex flex={1}>
							<ExpirySelector />
						</Flex>
					</Flex>
					<Flex flex="1" justify="center" gap="middle">
						<Flex style={{ marginTop: '23px' }}>
							<YeildButton label="Total Profit" />
						</Flex>
						<Flex style={{ marginTop: '23px' }}>
							<YeildButton label="Spot Loss" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</DetailBasketHolder>
	)
}

export default OptionBasketDetail
