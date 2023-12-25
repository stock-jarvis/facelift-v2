import { useState, useEffect } from 'react'
import { Modal, theme, Flex, Typography, Divider } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'

import ExitCondition from './modal-containers/exit-condition'
import DetailsContainer from './modal-containers/detail-container'
import { useUndefinedSet } from './modal-hooks/useUndefinedSet'
import { useUndefinedNumberedSet } from './modal-hooks/useUndefinedNumberSet'
import { generateUniqueId } from '../../common/utils/randomizer'
import { useBasketStore } from '../../store/basket-store'
import { usePersistState } from './modal-hooks/usePersistState'
import { useValidateTimes } from './modal-hooks/useValidateTimes'
import { useMarketTimes } from './modal-hooks/useMarketTime'
import Selectors from './modal-containers/selector-container'

import { tradeTypeData } from '../../constants/data'
import {
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
	count: 0,
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
	count: 0,
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
	count: 0,
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
		closeEditConfirmation,
	} = useBasketStore()

	const { token } = theme.useToken()
	//	const [basketData, setBasketData] = useState({ quanity: 1 })
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
	const [currentExitMinute, setCurrentExitMinute] = useState<number>(0)
	const [currentEntryMinute, setCurrentEntryMinute] = useState<number>(0)
	const [finalTradeType, setFinalTradeType] = useState<string>('SQAL')
	const [persistedValues, setPersistedValues] = useState<PersistedValues>()
	const [subTradeOption, setSubTradeOption] = useState<string>(initialSubTrade)

	const [basketPositions, setBasketPositions] = useState<string>('INTRA')
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
						count: basket.length + 1,
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
							count: basket.length + 1,
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
							count: basket.length + 1,
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
		const filteredBaskets = basket.filter((basket) => basket.id !== id)
		const refinedBaskets = filteredBaskets.map((basket, index) => ({
			...basket,
			count: index + 1,
		}))
		setBasket(refinedBaskets)
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
				{
					...basketToBeCopied,
					count: basket.length + 1,
					id: generateUniqueId(),
				},
			])
		}
	}

	return (
		<Modal
			open={open}
			width={1250}
			closeIcon={<CloseOutlined />}
			onCancel={() => closeEditConfirmation(true)}
			destroyOnClose={true}
			afterClose={handleAfterClose}
			title={
				<Flex style={{ padding: token.paddingXS }}>
					<Typography.Text>Edit Baskets</Typography.Text>
				</Flex>
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
			<Flex
				vertical
				gap={'middle'}
				style={{
					padding: token.paddingMD,
					height: '550px',
					overflow: 'scroll',
					scrollBehavior: 'smooth',
				}}
			>
				<Divider>
					<Typography.Text
						style={{
							color: token.colorPrimary,
							fontSize: token.fontSizeLG,
							fontWeight: token.fontWeightStrong,
						}}
					>
						{basketName} {basketIdentifier > 0 ? ` - ${basketIdentifier}` : ''}
					</Typography.Text>
				</Divider>
				<Header
					trade={basketTrade}
					handleTradeChange={setBasketTrade}
					instrument={instrument}
					handleInstrumentChange={setInstrument}
					setBasketPositions={setBasketPositions}
					setAtm={setAtm}
				/>
				<Selectors
					//	basketData={basketData}
					//		setBasketData={setBasketData}
					quantityValue={quantityValue}
					actionValue={actionValue}
					instrument={instrument}
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
				{basket.length > 0 && (
					<DetailsContainer
						basket={basket}
						instrument={instrument}
						optionType={optionType}
						tradeOption={tradeOption}
						subTradeOption={subTradeOption}
						subTradeOptionList={subTradeOptionList}
						setBasket={setBasket}
						handleCopyBasket={handleCopyBasket}
						handleDeleteBasket={handleDeleteBasket}
					/>
				)}
				{basket.length > 0 && (
					<>
						<br />
						<Divider>
							<Typography.Text
								style={{
									color: token.colorPrimary,
									fontSize: token.fontSizeLG,
									fontWeight: token.fontWeightStrong,
								}}
							>
								Exit Parameters
							</Typography.Text>
						</Divider>
						<ExitCondition
							moveSl={moveSl}
							exchange={basketTrade}
							entryHoursData={entryHourList}
							entryMinutesData={entryMinuteList}
							entryHourValue={currentEntryHour}
							lossValue={lossValue}
							profitValue={profitValue}
							basketTradeType={finalTradeType}
							entryMinuteValue={currentEntryMinute}
							exitHoursData={exitHourList}
							exitMinutesData={exitMinuteList}
							exitHourValue={currentExitHour}
							exitMinuteValue={currentExitMinute}
							handleBasketTradeTypeChange={setFinalTradeType}
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
					</>
				)}
			</Flex>
		</Modal>
	)
}

export default EditBasketModal
