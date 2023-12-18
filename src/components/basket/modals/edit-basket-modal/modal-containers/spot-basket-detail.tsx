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
import { useTypeChange } from '../modal-hooks/useTypeChange'
interface SpotDetailsProps {
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	handleEditBasket: (basket: BasketDataProps[]) => void
	id: string
	basket: BasketDataProps[]

	baseInstrumentValue: string
	baseQuanity: number
	baseActionValue: string
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
}: SpotDetailsProps) => {
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)
	const [spotLossType, setSpotLossType] = useState<string>(
		spotLossOptions[0].value
	)
	const [totalProfitType, setTotalProfitType] = useState<string>(
		totalProfitOptions[0].value
	)
	const [totalProfitValue, setTotalProfitValue] = useState<number>(1)
	const [spotLossValue, setSpotLossValue] = useState<number>(1)
	useValueChange(quantityValue, id, basket, handleEditBasket, 'qunatity')
	useActionChange(actionValue, id, basket, handleEditBasket, 'action_type')
	useValueChange(
		totalProfitValue,
		id,
		basket,
		handleEditBasket,
		'total_profit_value'
	)
	useValueChange(spotLossValue, id, basket, handleEditBasket, 'stop_loss_value')
	useTypeChange(spotLossType, id, basket, handleEditBasket, 'stop_loss_type')
	useTypeChange(
		totalProfitType,
		id,
		basket,
		handleEditBasket,
		'total_profit_type'
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
