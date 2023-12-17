import DetailBasketHolder from './detail-basket-holder'
import Instrument from '../modal-components/instrument'
import QuantityInput from '../modal-components/quantity-input'
import ActionSelector from '../modal-components/action-selector'
import YeildButton from '../modal-components/yeild-button'
import { Flex } from 'antd'
import { useState } from 'react'
interface SpotDetailsProps {
	id: string
	handleDeleteBasket: (val: string) => void
	handleCopyBasket: (val: string) => void
	baseQuanity: number
	baseActionValue: string
}

const SpotBasketDetail = ({
	id,
	handleDeleteBasket,
	handleCopyBasket,
	baseQuanity,
	baseActionValue,
}: SpotDetailsProps) => {
	const [quantityValue, setQuantityValue] = useState<number>(baseQuanity)
	const [actionValue, setActionValue] = useState<string>(baseActionValue)

	return (
		<DetailBasketHolder
			id={id}
			handleDeleteBasket={handleDeleteBasket}
			handleCopyBasket={handleCopyBasket}
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
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton label="Total Profit" />
				</Flex>
				<Flex flex={1} style={{ marginTop: '23px' }}>
					<YeildButton label="Spot Loss" />
				</Flex>
			</Flex>
		</DetailBasketHolder>
	)
}

export default SpotBasketDetail
