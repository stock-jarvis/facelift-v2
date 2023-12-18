import DetailBasketHolder from './detail-basket-holder'
import { Flex } from 'antd'
import { useState } from 'react'
import Instrument from '../modal-components/instrument'
import ActionSelector from '../modal-components/action-selector'
import QuantityInput from '../modal-components/quantity-input'
import YeildButton from '../modal-components/yeild-button'
import ExpirySelector from '../modal-components/expiry-selector'
import { useQuantityChange } from '../modal-hooks/useQuantityChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExpiryChange } from '../modal-hooks/useExpiryChange'

import {
	OptionObject,
	BasketDataProps,
} from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'

interface FututreDetailsProps {
	id: string
	baseQuanity: number
	baseActionValue: string
	futureExpiryList: OptionObject[]
	futureExpiryBaseValue: string
	basket: BasketDataProps[]
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
}
const FututeBasketDetails = ({
	id,
	basket,
	baseQuanity,
	baseActionValue,
	futureExpiryList,
	futureExpiryBaseValue,
	handleCopyBasket,
	handleEditBasket,
	handleDeleteBasket,
}: FututreDetailsProps) => {
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [expirtyValue, setExpiryValue] = useState<string>(futureExpiryBaseValue)
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
	useExpiryChange(expirtyValue, id, basket, handleEditBasket)

	return (
		<DetailBasketHolder
			handleCopyBasket={handleCopyBasket}
			id={id}
			handleDeleteBasket={handleDeleteBasket}
		>
			<Flex flex="1" justify="space-around">
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
						baseActionValue={actionValue}
						handleBaseActionChange={setActionValue}
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
						expiryOptions={futureExpiryList}
						expiryValue={expirtyValue}
						handleExpiryChange={setExpiryValue}
					/>
				</Flex>
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton
						label="Total Profit"
						options={totalProfitOptions}
						targetType={totalProfitType}
						targetValue={totalProfitValue}
						handleTargetValueChange={setTotalProfitValue}
						handleTargetTypeChange={setTotalProfitType}
					/>
				</Flex>
				<Flex flex={1} style={{ marginTop: '23px' }}>
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
		</DetailBasketHolder>
	)
}

export default FututeBasketDetails
