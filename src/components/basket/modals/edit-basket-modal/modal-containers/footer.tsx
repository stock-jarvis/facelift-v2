import { Flex, Button, theme, Input } from 'antd'

import { useBasketStore } from 'src/components/basket/store/basket-store'
import {
	BasketDataProps,
	SavedBasketsExitCondition,
	SavedBasketsEntryCondition,
	SavedBasketsObject,
} from 'src/components/basket/types/types'
import { SnippetsOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { generateUniqueId } from 'src/components/basket/utils/randomizer'
interface FooterProps {
	basketData: SavedBasketsObject
	basket: BasketDataProps[]
}

const Footer: React.FC<FooterProps> = ({ basket, basketData }) => {
	const { token } = theme.useToken()

	const {
		timeError,
		toggleTimeErrorModalOpen,
		setEmptyBasketError,
		resetEditablebasket,
		updateRuntimeBasketData,
		toogleEditModal,
	} = useBasketStore()

	const [basketEntryConditions, setBasketEntryConditions] =
		useState<SavedBasketsEntryCondition>()
	const [basketExitConditions, setBasketExitConditions] =
		useState<SavedBasketsExitCondition>()
	const [savedBasket, setSavedBasket] = useState<SavedBasketsObject>()

	useEffect(() => {
		if (
			!basketEntryConditions ||
			basketEntryConditions.entryTime !==
				basketData.entryCondition?.entryTime ||
			basketEntryConditions.exitTime !== basketData.entryCondition.exitTime
		) {
			setBasketEntryConditions(basketData.entryCondition)
		}
	}, [basketData, basketEntryConditions])

	useEffect(() => {
		if (
			!basketExitConditions ||
			basketExitConditions.type !== basketData.exitCondition.type ||
			basketExitConditions.totalProfit !==
				basketData.exitCondition.totalProfit ||
			basketExitConditions.totalLoss !== basketData.exitCondition.totalLoss ||
			(basketData.exitCondition.type === 'SQOL' &&
				basketExitConditions.move !== basketData.exitCondition.move) ||
			(basketData.exitCondition.type === 'SQAL' &&
				basketExitConditions.repeat !== basketData.exitCondition.repeat)
		) {
			const obj: SavedBasketsExitCondition = {
				type: basketData.exitCondition.type,
				totalLoss: basketData.exitCondition.totalLoss,
				totalProfit: basketData.exitCondition.totalProfit,
			}
			if (obj.type === 'SQOL') {
				obj.move = basketData.exitCondition.move
			} else if (obj.type === 'SQAL') {
				obj.repeat = basketData.exitCondition.repeat
			}
			setBasketExitConditions(obj)
		}
	}, [basketData, basketExitConditions])
	useEffect(() => {
		if (
			!savedBasket ||
			savedBasket.ticker !== basketData.ticker ||
			savedBasket.id !== basketData.id ||
			savedBasket.exchange !== basketData.exchange ||
			savedBasket.atm !== basketData.atm ||
			savedBasket.entryCondition !== basketEntryConditions ||
			savedBasket.name !== basketData.name ||
			savedBasket.identifier !== basketData.identifier ||
			savedBasket.exitCondition !== basketExitConditions ||
			savedBasket.positions !== basket ||
			savedBasket.type !== basketData.type
		) {
			if (basketExitConditions) {
				setSavedBasket({
					key: generateUniqueId(),
					ticker: basketData.ticker,
					id: basketData.id,
					name: basketData.name,
					identifier: basketData.identifier,
					exchange: basketData.exchange,
					type: basketData.type,
					atm: basketData.atm,
					entryCondition: basketEntryConditions,
					exitCondition: basketExitConditions,
					positions: basket,
				})
			}
		}
	}, [
		basketEntryConditions,
		basketData,
		basket,
		basketExitConditions,
		savedBasket,
	])

	const handleSaveBasketClick = () => {
		if (basket.length > 0) {
			if (timeError) {
				toggleTimeErrorModalOpen(true)
			} else {
				if (savedBasket) {
					updateRuntimeBasketData(savedBasket)
					resetEditablebasket()
					toogleEditModal(false)
				}
			}
		} else {
			setEmptyBasketError(true)
		}
	}

	return (
		<Flex
			style={{
				padding: token.paddingSM,
				width: '100%',
				borderTop: '1px solid #F0F0F0',
			}}
			justify="space-between"
			align="center"
		>
			<Input placeholder="spread" style={{ width: '150px' }} suffix={'%'} />
			<Button
				type="primary"
				onClick={handleSaveBasketClick}
				icon={<SnippetsOutlined />}
			>
				Save Basket
			</Button>
		</Flex>
	)
}

export default Footer
