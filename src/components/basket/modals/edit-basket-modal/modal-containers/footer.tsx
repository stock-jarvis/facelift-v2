import { Flex, Button, theme, Typography, Input, Space, Tooltip } from 'antd'

import { useBasketStore } from 'src/components/basket/store/basket-store'
import {
	BasketDataProps,
	SavedBasketsExitCondition,
	SavedBasketsEntryCondition,
	SavedBasketsObject,
} from 'src/components/basket/types/types'
import { useEffect, useState } from 'react'
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
	// console.log(
	// 	basketTrade,
	// 	basketRepeat,
	// 	atm,
	// 	simpleType,
	// 	id,
	// 	instrument,
	// 	basketMove,
	// 	profitValue,
	// 	lossValue,
	// 	currentEntryHour,
	// 	currentEntryMinute,
	// 	currentExitHour,
	// 	currentExitMinute
	// )
	const { token } = theme.useToken()
	const {
		timeError,
		toggleTimeErrorModalOpen,
		setEmptyBasketError,
		addToSavedBasket,
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
			basketEntryConditions.entry_time !== entryTimes ||
			basketEntryConditions.exit_time !== exitTimes
		) {
			setBasketEntryConditions({ entry_time: entryTimes, exit_time: exitTimes })
		}
	}, [basketEntryConditions, entryTimes, exitTimes])

	useEffect(() => {
		if (
			!basketExitConditions ||
			basketExitConditions.type !== basketTrade ||
			basketExitConditions.total_profit !== profitValue ||
			basketExitConditions.total_loss !== lossValue ||
			(basketTrade === 'SQOL' && basketExitConditions.move !== basketMove) ||
			(basketTrade === 'SQAL' && basketExitConditions.repeat !== basketRepeat)
		) {
			const obj: SavedBasketsExitCondition = {
				type: basketTrade,
				total_loss: lossValue,
				total_profit: profitValue,
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
	//console.log()
	useEffect(() => {
		if (
			!savedBasket ||
			savedBasket.ticker !== instrument ||
			savedBasket.id !== id ||
			savedBasket.exchange !== exchange ||
			savedBasket.atm !== atm ||
			savedBasket.entry_condition !== basketEntryConditions ||
			savedBasket.exit_condition !== basketExitConditions ||
			savedBasket.positions !== basket
		) {
			setSavedBasket({
				ticker: instrument,
				id: id,
				exchange: exchange,
				type: simpleType,
				atm: atm,
				entry_condition: basketEntryConditions,
				exit_condition: basketExitConditions,
				positions: basket,
			})
		}
	}, [
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
			justify="center"
			align="center"
		>
			<Flex
				className="max-md:flex-col max-md:items-start max-md:gap-4 justify-between"
				align="center"
				justify="space-between"
				style={{
					width: '90%',
					boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
					padding: token.paddingLG,
					borderRadius: token.borderRadiusLG,
					backgroundColor: '#F1F8FF',
				}}
			>
				<Space
					className="max-md:w-[100%]"
					style={{
						width: '150px',
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
						border: '2px solid',
						borderRadius: token.borderRadiusLG,
						borderColor: token.colorBgTextHover,
					}}
				>
					<Input
						type="primary"
						placeholder="Spread"
						style={{
							backgroundColor: '#F1F8FF',
							fontSize: token.fontSizeHeading5,
							outline: 'none',
							border: 'none',
						}}
					/>
					%
				</Space>

				<Space
					className="max-md:w-full max-md:flex max-md:justify-center"
					style={{
						padding: `${token.paddingXXS}px ${token.paddingContentHorizontalSM}px`,
					}}
				>
					<Typography.Text
						style={{
							fontSize: token.fontSizeHeading4,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{basketName}
						{identifier ? (identifier > 0 ? ` - ${identifier}` : '') : ''}
					</Typography.Text>
				</Space>
				<Tooltip title="Click to save basket">
					<Button
						className="max-md:w-[100%]"
						style={{
							backgroundColor: token.colorPrimary,
							fontWeight: token.fontWeightStrong,
						}}
						type="primary"
						size="large"
						onClick={handleSaveBasketClick}
					>
						Save Basket
					</Button>
				</Tooltip>
			</Flex>
		</Flex>
	)
}

export default Footer
