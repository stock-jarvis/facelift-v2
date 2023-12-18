import DetailBasketHolder from './detail-basket-holder'
import { Flex } from 'antd'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import StrikeSelector from '../modal-components/strike-selector'
import { useQuantityChange } from '../modal-hooks/useQuantityChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExpiryChange } from '../modal-hooks/useExpiryChange'
import { useState } from 'react'
import {
	OptionObject,
	TradeOptions,
	BasketDataProps,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'
interface OptionDetailsProps {
	id: string
	baseQuanity: number
	baseActionValue: string
	baseOptionValue: string
	basket: BasketDataProps[]
	optionExpiryBaseValue: string
	optionExpiryList: OptionObject[]
	baseTradeValue: number
	baseTradeOption: string
	baseSubTradeOption: string
	baseSubTradeOptionList: TradeOptions[]

	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const OptionBasketDetail = ({
	id,
	basket,
	baseQuanity,
	baseActionValue,
	baseOptionValue,
	optionExpiryList,
	optionExpiryBaseValue,
	baseTradeOption,
	baseSubTradeOption,
	baseSubTradeOptionList,
	baseTradeValue,
	handleDeleteBasket,
	handleCopyBasket,
	handleEditBasket,
}: OptionDetailsProps) => {
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [optionType, setOptionType] = useState<string>(baseOptionValue)
	const [tradeOption, setTradeOption] = useState<string>(baseTradeOption)
	const [tradeValue, setTradeValue] = useState<number>(baseTradeValue)
	const [subTradeOption, setSubTradeOption] =
		useState<string>(baseSubTradeOption)

	const [subTradeOptionList, setSubTradeOptionList] = useState<TradeOptions[]>(
		baseSubTradeOptionList
	)
	const [expiryValue, setExpiryValue] = useState<string>(optionExpiryBaseValue)

	const [spotLossType, setSpotLossType] = useState<string>(
		spotLossOptions[0].value
	)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		totalProfitOptions[0].value
	)
	const [totalProfitValue, setTotalProfitValue] = useState<number>(1)
	const [spotLossValue, setSpotLossValue] = useState<number>(1)

	useQuantityChange(quantityValue, id, basket, handleEditBasket)
	useActionChange(actionValue, id, basket, handleEditBasket, 'action_type')
	useActionChange(optionType, id, basket, handleEditBasket, 'option_type')
	useExpiryChange(expiryValue, id, basket, handleEditBasket)

	return (
		<DetailBasketHolder
			id={id}
			handleDeleteBasket={handleDeleteBasket}
			handleCopyBasket={handleCopyBasket}
		>
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
								baseActionValue={actionValue}
								handleBaseActionChange={setActionValue}
							/>
						</Flex>
						<Flex flex={1} justify="center">
							<ActionSelector
								label="Option Type"
								action1="CE"
								action2="PE"
								color1="black"
								color2="purple"
								baseActionValue={optionType}
								handleBaseActionChange={setOptionType}
							/>
						</Flex>

						<Flex flex={1}>
							<StrikeSelector
								tradeOption={tradeOption}
								tradeValue={tradeValue}
								setTradeValue={setTradeValue}
								setTradeOption={setTradeOption}
								subTradeOption={subTradeOption}
								setSubTradeOption={setSubTradeOption}
								subTradeOptionList={subTradeOptionList}
								setSubTradeOptionList={setSubTradeOptionList}
							/>
						</Flex>
						<Flex flex={1}>
							<QuantityInput
								baseQuantityValue={quantityValue}
								handleQantityChange={setQuantityValue}
							/>
						</Flex>
						<Flex flex={1}>
							<ExpirySelector
								expiryValue={expiryValue}
								handleExpiryChange={setExpiryValue}
								expiryOptions={optionExpiryList}
							/>
						</Flex>
					</Flex>
					<Flex flex="1" justify="center" gap="middle">
						<Flex>
							<YeildButton
								label="Total Profit"
								options={totalProfitOptions}
								targetType={totalProfitType}
								targetValue={totalProfitValue}
								handleTargetValueChange={setTotalProfitValue}
								handleTargetTypeChange={setTotalProfitType}
							/>
						</Flex>
						<Flex>
							<YeildButton
								label="Spot Loss"
								options={spotLossOptions}
								targetType={spotLossType}
								targetValue={spotLossValue}
								handleTargetValueChange={setSpotLossValue}
								handleTargetTypeChange={setSpotLossType}
							/>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</DetailBasketHolder>
	)
}

export default OptionBasketDetail
