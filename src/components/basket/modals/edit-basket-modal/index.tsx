import { useState, useEffect } from 'react'
import { Modal, theme, Flex } from 'antd'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
import Toggle from './modal-components/toggle'
import FututeBasketDetails from './modal-containers/future-basket-details'
import OptionBasketDetail from './modal-containers/options-basket-details'
import SpotBasketDetail from './modal-containers/spot-basket-detail'
import ExitCondition from './modal-containers/exit-condition'

import { useUndefinedSet } from './modal-hooks/useUndefinedSet'
import { useUndefinedNumberedSet } from './modal-hooks/useUndefinedNumberSet'
import { generateUniqueId } from '../../common/utils/randomizer'
import { useBasketStore } from '../../store/basket-store'
import { usePersistState } from './modal-hooks/usePersistState'
import { useValidateTimes } from './modal-hooks/useValidateTimes'
import { useMarketTimes } from './modal-hooks/useMarketTime'
import Selectors from './modal-containers/selector-container'
import {
	futureExpiry,
	optionExpiry,
	tradeTypeData,
	totalProfitOptions,
	spotLossOptions,
} from '../../constants/data'
import {
	OptionObject,
	TradeOptions,
	BasketDataProps,
	PersistedValues,
	TimeHours,
	Time,
} from '../../types/types'

const initialSubTrade = tradeTypeData[0].children[0].value
const initialSubTradeList = tradeTypeData[0].children
const initialTrade = tradeTypeData[0].value

const defaultSpotPosition: BasketDataProps = {
	id: generateUniqueId(),
	type: 'spot',
	entryCondition: {
		quantity: 1,
		actionType: 'B',
	},
	exitCondition: {
		stopLoss: { type: 'percent', value: 0 },
		totalProfit: { type: 'percent', value: 0 },
	},
}

const defaultFuturePosition: BasketDataProps = {
	id: generateUniqueId(),
	type: 'future',
	entryCondition: {
		quantity: 1,
		actionType: 'B',
		expiry: 'Monthly',
	},
	exitCondition: {
		stopLoss: { type: 'percent', value: 0 },
		totalProfit: { type: 'percent', value: 0 },
	},
}

const defaultOptionsPosition: BasketDataProps = {
	id: generateUniqueId(),
	type: 'options',
	entryCondition: {
		quantity: 1,
		actionType: 'B',
		expiry: 'Monthly',
		optionType: 'CE',
		tradeType: tradeTypeData[0].value,
		tradeTypeParams: tradeTypeData[0].children[0].value,
		tradeTypeValue: 1,
	},
	exitCondition: {
		stopLoss: { type: 'percent', value: 0 },
		totalProfit: { type: 'percent', value: 0 },
	},
}

interface EditModalProps {
	open: boolean
}

const EditBasketModal = ({ open }: EditModalProps) => {
	const {
		editableBasketData,
		savedBaskets,
		setTimeError,
		positionCopy,
		setPositionCopy,
		resetEditablebasket,
	} = useBasketStore()

	const { token } = theme.useToken()

	const [atm, setAtm] = useState<string>('spot')
	const [basket, setBasket] = useState<BasketDataProps[]>([])
	const [moveSl, setMoveSl] = useState<boolean>(false)
	const [repeatSl, setRepeatSl] = useState<string>('NA')
	const [lossValue, setLossValue] = useState<number>(0)
	const [tradeValue, setTradeValue] = useState<number>(0)
	const [optionType, setOptionType] = useState<string>('CE')
	const [basketName, setBasketName] = useState<string>('')
	const [instrument, setInstrument] = useState<string>('')
	const [profitValue, setProfitValue] = useState<number>(0)
	const [tradeOption, setTradeOption] = useState<string>(initialTrade)
	const [actionValue, setActionValue] = useState<string>('B')
	const [basketTrade, setBasketTrade] = useState<string>('')
	const [exitHourList, setExitHourList] = useState<TimeHours[]>()
	const [entryHourList, setEntryHourList] = useState<TimeHours[]>()
	const [quantityValue, setQuantityValue] = useState<number>(1)
	const [exitMinuteList, setExitMinuteList] = useState<Time[]>()
	const [entryMinuteList, setEntryMinuteList] = useState<Time[]>()
	const [currentExitHour, setCurrentExitHour] = useState<number>(0)
	const [basketIdentifier, setBasketIdentifier] = useState<number>(0)
	const [currentEntryHour, setCurrentEntryHour] = useState<number>(0)
	const [futureExpiryList] = useState<OptionObject[]>(futureExpiry)
	const [optionExpiryList] = useState<OptionObject[]>(optionExpiry)
	const [currentExitMinute, setCurrentExitMinute] = useState<number>(0)
	const [currentEntryMinute, setCurrentEntryMinute] = useState<number>(0)
	const [finalTradeType, setFinalTradeType] = useState<string>('SQAL')
	const [persistedValues, setPersistedValues] = useState<PersistedValues>()
	//const [isSavedState, setIsSavedState] = useState<boolean>(false)
	const [subTradeOption, setSubTradeOption] = useState<string>(initialSubTrade)

	const [basketPositions, setBasketPositions] = useState<string>('INTRA')
	const [basketTradeType, setBasketTradeType] =
		useState<string>('Square off one Leg')
	const [subTradeOptionList, setSubTradeOptionList] =
		useState<TradeOptions[]>(initialSubTradeList)
	const [futureExpiryBaseValue, setFutureExpiryBaseValue] =
		useState<string>('Monthly')
	const [optionExpiryBaseValue, setOptionExpiryBaseValue] =
		useState<string>('Monthly')

	useEffect(() => {
		if (editableBasketData) {
			const isSaved = savedBaskets.find(
				(basket) => basket.id === editableBasketData.id
			)
			if (isSaved) {
				setBasket(isSaved.positions || [])
				setInstrument(isSaved.ticker)
				setBasketTrade(isSaved.exchange)
				setProfitValue(isSaved.exitCondition?.totalProfit || 0)
				setLossValue(isSaved.exitCondition?.totalLoss || 0)
			}
		}
	}, [editableBasketData, savedBaskets])

	useValidateTimes(
		currentEntryHour,
		currentExitHour,
		currentEntryMinute,
		currentExitMinute,
		setTimeError
	)

	useEffect(() => {
		if (basketTradeType === 'Square of All Legs') {
			setFinalTradeType('SQAL')
		} else {
			setFinalTradeType('SQOL')
		}
	}, [basketTradeType])

	usePersistState(
		positionCopy,
		setPositionCopy,
		persistedValues,
		setQuantityValue,
		setActionValue,
		setOptionType,
		setOptionExpiryBaseValue,
		setFutureExpiryBaseValue,
		setTradeOption,
		setSubTradeOption,
		setTradeValue
	)

	useMarketTimes(
		basketTrade,
		entryHourList,
		exitHourList,
		setEntryHourList,
		setExitHourList,
		setEntryMinuteList,
		setExitMinuteList,
		setCurrentEntryHour,
		setCurrentEntryMinute,
		setCurrentExitHour,
		setCurrentExitMinute
	)

	useUndefinedNumberedSet(
		basketIdentifier,
		editableBasketData,
		'identifier',
		setBasketIdentifier
	)

	useUndefinedSet(basketTrade, editableBasketData, 'exchange', setBasketTrade)
	useUndefinedSet(basketName, editableBasketData, 'name', setBasketName)
	useUndefinedSet(instrument, editableBasketData, 'instrument', setInstrument)
	useUndefinedSet(
		basketIdentifier,
		editableBasketData,
		'instrument',
		setInstrument
	)

	const handleAtmChange = (value: string) => {
		if (value === 'Future as ATM') {
			setAtm('future')
		} else {
			setAtm('spot')
		}
	}
	const handleBasketPositionsChange = (value: string) => {
		if (value === 'POSITIONAL') {
			setBasketPositions('POS')
		} else {
			setBasketPositions('INTRA')
		}
	}

	const handleAfterClose = () => {
		resetEditablebasket()
		setBasket([])
		setInstrument('')
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setProfitValue(0)
		setLossValue(0)
		setBasketTrade('')
		setBasketName('')
		setBasketIdentifier(0)
		setTradeOption(initialTrade)
		setSubTradeOption(initialSubTrade)
		setSubTradeOptionList(initialSubTradeList)
		setFutureExpiryBaseValue('Monthly')
		setOptionExpiryBaseValue('Monthly')
		setCurrentExitHour(0)
		setCurrentExitMinute(0)
		setCurrentEntryHour(0)
		setCurrentEntryMinute(0)
		setExitMinuteList([])
		setEntryHourList([])
		setExitHourList([])
		setEntryMinuteList([])
	}

	const setOptionValue = () => {
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setOptionExpiryBaseValue('Monthly')
		setFutureExpiryBaseValue('Monthly')
		setTradeValue(1)
		setTradeOption(tradeTypeData[0].value)
		setSubTradeOption(tradeTypeData[0].children[0].value)
		setSubTradeOptionList(tradeTypeData[0].children)
	}

	const handleAddBasket = (value: string) => {
		const uniqueId = generateUniqueId()
		setBasket((prev) => [
			...prev,
			value === 'spot'
				? {
						...defaultSpotPosition,
						id: uniqueId,
						entryCondition: {
							quantity: quantityValue,
							actionType: actionValue,
						},
						exitCondition: {
							stopLoss: {
								type: 'percent',
								value: 0,
							},
							totalProfit: {
								type: 'percent',
								value: 0,
							},
						},
					}
				: value === 'future'
					? {
							...defaultFuturePosition,
							id: uniqueId,
							entryCondition: {
								quantity: quantityValue,
								actionType: actionValue,
								expiry: futureExpiryBaseValue,
							},
							exitCondition: {
								stopLoss: {
									type: 'percent',
									value: 0,
								},
								totalProfit: {
									type: 'percent',
									value: 0,
								},
							},
						}
					: {
							...defaultOptionsPosition,
							id: uniqueId,
							entryCondition: {
								quantity: quantityValue,
								actionType: actionValue,
								expiry: optionExpiryBaseValue,
								tradeType: tradeOption,
								tradeTypeParams: subTradeOption,
								tradeTypeValue: tradeValue,
							},
							exitCondition: {
								stopLoss: {
									type: 'percent',
									value: 0,
								},
								totalProfit: {
									type: 'percent',
									value: 0,
								},
							},
						},
		])
	}

	const handleDeleteBasket = (id: string) => {
		setBasket(basket.filter((basket) => basket.id !== id))
	}

	const handleCopyBasket = (id: string) => {
		setPersistedValues({
			quantityValue,
			actionValue,
			tradeOption,
			subTradeOption,
			tradeValue,
			optionType,
			optionExpiryBaseValue,
			futureExpiryBaseValue,
		})
		const basketToBeCopied = basket.find((basket) => basket.id === id)
		setPositionCopy(true)
		if (basketToBeCopied) {
			if (basketToBeCopied.type === 'spot') {
				setActionValue(basketToBeCopied.entryCondition.actionType)
				setQuantityValue(basketToBeCopied.entryCondition.quantity)
			} else if (basketToBeCopied.type === 'future') {
				setActionValue(basketToBeCopied.entryCondition.actionType)
				setQuantityValue(basketToBeCopied.entryCondition.quantity)
				setFutureExpiryBaseValue(
					basketToBeCopied.entryCondition.expiry
						? basketToBeCopied.entryCondition.expiry
						: 'Monthly'
				)
			} else if (basketToBeCopied.type === 'options') {
				setActionValue(basketToBeCopied.entryCondition.actionType)
				setOptionType(
					basketToBeCopied.entryCondition.optionType
						? basketToBeCopied.entryCondition.optionType
						: 'CE'
				)
				setTradeOption(
					basketToBeCopied.entryCondition.tradeType
						? basketToBeCopied.entryCondition.tradeType
						: tradeTypeData[0].value
				)
				setSubTradeOption(
					basketToBeCopied.entryCondition.tradeTypeParams
						? basketToBeCopied.entryCondition.tradeTypeParams
						: tradeTypeData[0].children[0].value
				)
				setTradeValue(
					basketToBeCopied.entryCondition.tradeTypeValue
						? basketToBeCopied.entryCondition.tradeTypeValue
						: 1
				)
				setQuantityValue(basketToBeCopied.entryCondition.quantity)
				setOptionExpiryBaseValue(
					basketToBeCopied.entryCondition.expiry
						? basketToBeCopied.entryCondition.expiry
						: 'Monthly'
				)
			}

			setBasket((prev) => [
				...prev,
				{ ...basketToBeCopied, id: generateUniqueId() },
			])
		}
	}

	return (
		<Modal
			open={open}
			width={1250}
			closeIcon={null}
			destroyOnClose={true}
			afterClose={handleAfterClose}
			title={
				<Header
					trade={basketTrade}
					handleTradeChange={setBasketTrade}
					instrument={instrument}
					handleInstrumentChange={setInstrument}
				/>
			}
			footer={
				<Footer
					profitValue={profitValue}
					lossValue={lossValue}
					currentEntryHour={currentEntryHour}
					currentEntryMinute={currentEntryMinute}
					currentExitHour={currentExitHour}
					currentExitMinute={currentExitMinute}
					id={editableBasketData.id}
					exchange={basketTrade}
					instrument={instrument}
					basket={basket}
					basketMove={moveSl}
					basketRepeat={repeatSl}
					basketTrade={finalTradeType}
					identifier={basketIdentifier}
					basketName={basketName}
					atm={atm}
					simpleType={basketPositions}
				/>
			}
			styles={{
				content: {
					margin: -30,
					padding: 0,
				},
				header: {
					padding: token.paddingXS,
				},
				footer: {
					padding: token.paddingXS,
				},
				body: {
					overflow: 'scroll',
					scrollBehavior: 'smooth',
				},
			}}
		>
			<Flex vertical gap="middle">
				<Flex
					vertical
					gap={'middle'}
					style={{
						padding: token.paddingMD,
						height: '500px',
						overflow: 'scroll',
						scrollBehavior: 'smooth',
					}}
					className="no-scrollbar"
				>
					<Flex
						vertical
						justify="space-between"
						align="center"
						flex={1}
						style={{
							padding: token.paddingXS,
							paddingTop: 30,
							paddingBottom: 30,
							gap: '20px',
							borderRadius: token.borderRadiusLG,
						}}
					>
						<div className="w-[50%]">
							<Toggle
								toogle1="INTRADAY"
								toogle2="POSITIONAL"
								setToogleValue={handleBasketPositionsChange}
							/>
						</div>

						<div className="w-[50%]">
							<Toggle
								toogle1="Spot as ATM"
								toogle2="Future as ATM"
								setToogleValue={handleAtmChange}
							/>
						</div>
					</Flex>

					<Selectors
						quantityValue={quantityValue}
						actionValue={actionValue}
						instrument={instrument}
						optionExpiryList={optionExpiryList}
						futureExpiryList={futureExpiryList}
						futureExpiryBaseValue={futureExpiryBaseValue}
						optionExpiryBaseValue={optionExpiryBaseValue}
						subTradeOption={subTradeOption}
						optionType={optionType}
						tradeValue={tradeValue}
						tradeOption={tradeOption}
						subTradeOptionList={subTradeOptionList}
						setTradeOption={setTradeOption}
						setOptionType={setOptionType}
						setTradeValue={setTradeValue}
						setActionValue={setActionValue}
						handleAddBasket={handleAddBasket}
						setQuantityValue={setQuantityValue}
						setSubTradeOption={setSubTradeOption}
						setSubTradeOptionList={setSubTradeOptionList}
						setFutureExpiryBaseValue={setFutureExpiryBaseValue}
						setOptionExpiryBaseValue={setOptionExpiryBaseValue}
						setOptionValue={setOptionValue}
					/>

					{basket?.map((bask) =>
						bask.type === 'spot' ? (
							<SpotBasketDetail
								key={bask.id}
								id={bask.id}
								basket={basket}
								baseTotalProfitValue={
									bask.exitCondition?.totalProfit.value || 0
								}
								baseSpotLossOption={
									bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
								}
								baseTotalProfitOption={
									bask.exitCondition?.totalProfit.type ||
									totalProfitOptions[0].value
								}
								baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
								baseQuanity={bask.entryCondition.quantity}
								baseInstrumentValue={instrument}
								baseActionValue={bask.entryCondition.actionType}
								handleEditBasket={setBasket}
								handleCopyBasket={handleCopyBasket}
								handleDeleteBasket={handleDeleteBasket}
							/>
						) : bask.type === 'future' ? (
							<FututeBasketDetails
								key={bask.id}
								id={bask.id}
								baseQuanity={bask.entryCondition.quantity}
								baseInstrumentValue={instrument}
								baseTotalProfitValue={
									bask.exitCondition?.totalProfit.value || 0
								}
								baseSpotLossOption={
									bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
								}
								baseTotalProfitOption={
									bask.exitCondition?.totalProfit.type ||
									totalProfitOptions[0].value
								}
								baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
								baseActionValue={bask.entryCondition.actionType}
								futureExpiryBaseValue={bask.entryCondition.expiry || 'Monthly'}
								futureExpiryList={futureExpiryList}
								basket={basket}
								handleEditBasket={setBasket}
								handleCopyBasket={handleCopyBasket}
								handleDeleteBasket={handleDeleteBasket}
							/>
						) : (
							<OptionBasketDetail
								key={bask.id}
								id={bask.id}
								baseQuanity={bask.entryCondition.quantity}
								optionExpiryBaseValue={bask.entryCondition.expiry || 'Monthly'}
								baseTotalProfitValue={
									bask.exitCondition?.totalProfit.value || 0
								}
								baseSpotLossOption={
									bask.exitCondition?.stopLoss.type || spotLossOptions[0].value
								}
								baseTotalProfitOption={
									bask.exitCondition?.totalProfit.type ||
									totalProfitOptions[0].value
								}
								baseSpotLossValue={bask.exitCondition?.stopLoss.value || 0}
								baseActionValue={bask.entryCondition.actionType}
								baseOptionValue={bask.entryCondition.optionType || optionType}
								baseInstrumentValue={instrument}
								optionExpiryList={optionExpiryList}
								baseSubTradeOption={
									bask.entryCondition.tradeTypeParams || subTradeOption
								}
								baseTradeOption={bask.entryCondition.tradeType || tradeOption}
								baseSubTradeOptionList={
									tradeTypeData.find(
										(trade) => trade.value === bask.entryCondition.tradeType
									)?.children || subTradeOptionList
								}
								baseTradeValue={bask.entryCondition.tradeTypeValue || 0}
								basket={basket}
								handleEditBasket={setBasket}
								handleCopyBasket={handleCopyBasket}
								handleDeleteBasket={handleDeleteBasket}
							/>
						)
					)}
					{basket.length > 0 && (
						<ExitCondition
							moveSl={moveSl}
							exchange={basketTrade}
							entryHoursData={entryHourList}
							entryMinutesData={entryMinuteList}
							entryHourValue={currentEntryHour}
							lossValue={lossValue}
							profitValue={profitValue}
							basketTradeType={basketTradeType}
							entryMinuteValue={currentEntryMinute}
							exitHoursData={exitHourList}
							exitMinutesData={exitMinuteList}
							exitHourValue={currentExitHour}
							exitMinuteValue={currentExitMinute}
							handleBasketTradeTypeChange={setBasketTradeType}
							handleLossValueChange={setLossValue}
							setRepeatSl={setRepeatSl}
							handleProfitValueChange={setProfitValue}
							handleChangeEntryHour={setCurrentEntryHour}
							setMoveSl={setMoveSl}
							handleChangeEntryMinute={setCurrentEntryMinute}
							handleEntryMinuteListChange={setEntryMinuteList}
							handleExitMinuteListChange={setExitMinuteList}
							handleChangeExitHour={setCurrentExitHour}
							handleChangeExitMinute={setCurrentExitMinute}
						/>
					)}
				</Flex>
			</Flex>
		</Modal>
	)
}

export default EditBasketModal
