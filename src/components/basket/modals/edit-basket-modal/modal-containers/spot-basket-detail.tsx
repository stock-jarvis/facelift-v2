import DetailBasketHolder from './detail-basket-holder'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
import { Flex } from 'antd'
import { useState } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'
import {
	spotLossOptions,
	totalProfitOptions,
} from 'src/components/basket/constants/data'
import { useValueChange } from '../modal-hooks/useValueChange'
import { useActionChange } from '../modal-hooks/useActionChange'
import { useExitValueChange } from '../modal-hooks/useExitValueChange'
import { useExitTypeChange } from '../modal-hooks/useExitTypeChange'
//import { useTypeChange } from '../modal-hooks/useTypeChange'
interface SpotDetailsProps {
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
	id: string
	basket: BasketDataProps[]
	baseSpotLossValue: number
	baseTotalProfitValue: number
	baseInstrumentValue: string
	baseQuanity: number
	baseActionValue: string
	baseSpotLossOption: string
	baseTotalProfitOption: string
}

const SpotBasketDetail = ({
	handleDeleteBasket,
	handleCopyBasket,
	handleEditBasket,
	id,
	basket,
	baseQuanity,
	baseActionValue,
	baseInstrumentValue,
	baseSpotLossValue,
	baseTotalProfitValue,
	baseSpotLossOption,
	baseTotalProfitOption,
}: SpotDetailsProps) => {
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [spotLossType, setSpotLossType] = useState<string>(baseSpotLossOption)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		baseTotalProfitOption
	)
	const [totalProfitValue, setTotalProfitValue] =
		useState<number>(baseTotalProfitValue)
	const [spotLossValue, setSpotLossValue] = useState<number>(baseSpotLossValue)

	useValueChange(quantityValue, id, basket, handleEditBasket, 'quantity')
	useActionChange(actionValue, id, basket, handleEditBasket, 'actionType')
	useExitValueChange(
		totalProfitValue,
		id,
		basket,
		handleEditBasket,
		'totalProfit'
	)
	useExitValueChange(spotLossValue, id, basket, handleEditBasket, 'stopLoss')
	useExitTypeChange(spotLossType, id, basket, handleEditBasket, 'stopLoss')
	useExitTypeChange(
		totalProfitType,
		id,
		basket,
		handleEditBasket,
		'totalProfit'
	)

	return (
		<DetailBasketHolder
			id={id}
			handleDeleteBasket={handleDeleteBasket}
			handleCopyBasket={handleCopyBasket}
		>
			<Flex flex="1" justify="space-around">
				<Flex flex={1} justify="center">
					<Instrument instrument={baseInstrumentValue} />
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
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton
						options={totalProfitOptions}
						label="Total Profit"
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

export default SpotBasketDetail
