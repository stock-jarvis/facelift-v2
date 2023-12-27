import { Flex, Button, theme } from 'antd'

import { useBasketStore } from 'src/components/basket/store/basket-store'
import {
	BasketDataProps,
	SavedBasketsExitCondition,
	SavedBasketsEntryCondition,
	SavedBasketsObject,
} from 'src/components/basket/types/types'
import { SnippetsOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { generateUniqueId } from 'src/components/basket/common/utils/randomizer'
interface FooterPorps {
	id: string
	atm: string
	instrument: string
	basket: BasketDataProps[]
	currentEntryHour: number
	currentEntryMinute: number
	currentExitHour: number
	currentExitMinute: number
	profitValue: number
	lossValue: number
	simpleType: string
	basketTrade: string
	exchange: string
	basketRepeat: string
	basketMove: boolean
	basketName: string | undefined
	identifier: number | undefined
}

const Footer = ({
	id,
	atm,
	basket,
	exchange,
	basketMove,
	simpleType,
	basketName,
	profitValue,
	lossValue,
	identifier,
	instrument,
	basketTrade,
	basketRepeat,
	currentEntryHour,
	currentEntryMinute,
	currentExitHour,
	currentExitMinute,
}: FooterPorps) => {
	const { token } = theme.useToken()
	const {
		timeError,
		toggleTimeErrorModalOpen,
		setEmptyBasketError,
		updateRuntimeBasketData,
		addToSavedBasket,
		toogleEditModal,
	} = useBasketStore()
	const [entryTimes, setEntryTimes] = useState<string>('')
	const [exitTimes, setExitTimes] = useState<string>('')
	const [basketEntryConditions, setBasketEntryConditions] =
		useState<SavedBasketsEntryCondition>()
	const [basketExitConditions, setBasketExitConditions] =
		useState<SavedBasketsExitCondition>()
	const [savedBasket, setSavedBasket] = useState<SavedBasketsObject>()
	useEffect(() => {
		let entryHour: string
		let entryMinute: string
		if (currentEntryHour < 10) {
			entryHour = '0' + currentEntryHour.toString()
		} else {
			entryHour = currentEntryHour.toString()
		}
		if (currentEntryMinute < 10) {
			entryMinute = '0' + currentEntryMinute.toString()
		} else {
			entryMinute = currentEntryMinute.toString()
		}
		setEntryTimes(entryHour + ':' + entryMinute + ':00')
	}, [currentEntryHour, currentEntryMinute])
	useEffect(() => {
		let exitHour: string
		let exitMinute: string
		if (currentExitHour < 10) {
			exitHour = '0' + currentExitHour.toString()
		} else {
			exitHour = currentExitHour.toString()
		}
		if (currentExitMinute < 10) {
			exitMinute = '0' + currentExitMinute.toString()
		} else {
			exitMinute = currentExitMinute.toString()
		}
		setExitTimes(exitHour + ':' + exitMinute + ':00')
	}, [currentExitHour, currentExitMinute])

	useEffect(() => {
		if (
			!basketEntryConditions ||
			basketEntryConditions.entryTime !== entryTimes ||
			basketEntryConditions.exitTime !== exitTimes
		) {
			setBasketEntryConditions({ entryTime: entryTimes, exitTime: exitTimes })
		}
	}, [basketEntryConditions, entryTimes, exitTimes])

	useEffect(() => {
		if (
			!basketExitConditions ||
			basketExitConditions.type !== basketTrade ||
			basketExitConditions.totalProfit !== profitValue ||
			basketExitConditions.totalLoss !== lossValue ||
			(basketTrade === 'SQOL' && basketExitConditions.move !== basketMove) ||
			(basketTrade === 'SQAL' && basketExitConditions.repeat !== basketRepeat)
		) {
			const obj: SavedBasketsExitCondition = {
				type: basketTrade,
				totalLoss: lossValue,
				totalProfit: profitValue,
			}
			if (obj.type === 'SQOL') {
				obj.move = basketMove
			} else if (obj.type === 'SQAL') {
				obj.repeat = basketRepeat
			}
			setBasketExitConditions(obj)
		}
	}, [
		basketTrade,
		lossValue,
		profitValue,
		basketMove,
		basketRepeat,
		basketExitConditions,
	])
	useEffect(() => {
		//	console.log(savedBasket)
	}, [savedBasket])
	useEffect(() => {
		if (
			!savedBasket ||
			savedBasket.ticker !== instrument ||
			savedBasket.id !== id ||
			savedBasket.exchange !== exchange ||
			savedBasket.atm !== atm ||
			savedBasket.entryCondition !== basketEntryConditions ||
			savedBasket.name !== basketName ||
			savedBasket.identifier !== identifier ||
			savedBasket.exitCondition !== basketExitConditions ||
			savedBasket.positions !== basket
		) {
			setSavedBasket({
				key: generateUniqueId(),
				ticker: instrument,
				id: id,
				name: basketName || '',
				identifier: identifier || 0,
				exchange: exchange,
				type: simpleType,
				atm: atm,
				entryCondition: basketEntryConditions,
				exitCondition: basketExitConditions,
				positions: basket,
			})
		}
	}, [
		identifier,
		basketName,
		basketEntryConditions,
		atm,
		exchange,
		simpleType,
		basket,
		basketExitConditions,
		savedBasket,
		instrument,
		id,
	])

	const handleSaveBasketClick = () => {
		if (basket.length > 0) {
			if (timeError) {
				toggleTimeErrorModalOpen(true)
			} else {
				if (savedBasket) {
					addToSavedBasket(savedBasket)
					updateRuntimeBasketData(id, exchange, instrument)
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
			justify="flex-end"
			align="center"
		>
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
