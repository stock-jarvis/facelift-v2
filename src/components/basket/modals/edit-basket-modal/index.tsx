import { useState, useEffect } from 'react'
import { Modal, theme, Flex, Typography, Divider } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'
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
	BasketDataValues,
	TimeHours,
	Time,
} from '../../types/types'

const initialSubTradeList = tradeTypeData[0].children

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

	////////////////////////////////////////

	const [basketInitialData, updatedBasketData] = useImmer<BasketDataValues>({
		quantity: 1,
		action: 'B',
		option: 'CE',
		expiry: 'Monthly',
		tradeValue: 1,
		tradeOption: tradeTypeData[0].value,
		subTradeOption: 'ATM',
		instrument: '',
	})
	////////////////////////////////////////
	const { token } = theme.useToken()
	const [atm, setAtm] = useState<string>('spot')
	const [basket, setBasket] = useState<BasketDataProps[]>([])
	const [moveSl, setMoveSl] = useState<boolean>(false)
	const [repeatSl, setRepeatSl] = useState<string>('NA')
	const [lossValue, setLossValue] = useState<number>(0)
	const [basketName, setBasketName] = useState<string>('')
	const [instrument, setInstrument] = useState<string>('')
	const [profitValue, setProfitValue] = useState<number>(0)
	const [basketTrade, setBasketTrade] = useState<string>('')
	const [exitHourList, setExitHourList] = useState<TimeHours[]>()
	const [entryHourList, setEntryHourList] = useState<TimeHours[]>()
	const [exitMinuteList, setExitMinuteList] = useState<Time[]>()
	const [entryMinuteList, setEntryMinuteList] = useState<Time[]>()
	const [currentExitHour, setCurrentExitHour] = useState<number>(0)
	const [basketIdentifier, setBasketIdentifier] = useState<number>(0)
	const [currentEntryHour, setCurrentEntryHour] = useState<number>(0)
	const [currentExitMinute, setCurrentExitMinute] = useState<number>(0)
	const [currentEntryMinute, setCurrentEntryMinute] = useState<number>(0)
	const [finalTradeType, setFinalTradeType] = useState<string>('SQAL')
	const [persistedValues, setPersistedValues] = useState<PersistedValues>()

	const [basketPositions, setBasketPositions] = useState<string>('INTRA')
	const [subTradeOptionList, setSubTradeOptionList] =
		useState<TradeOptions[]>(initialSubTradeList)

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
		basketInitialData,
		updatedBasketData,
		positionCopy,
		setPositionCopy,
		persistedValues
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
		updatedBasketData({
			...basketInitialData,
			quantity: 1,
			action: 'B',
			expiry: 'Monthly',
			option: 'CE',
			tradeValue: 1,
			tradeOption: '',
			subTradeOption: '',
		})
		setProfitValue(0)
		setLossValue(0)
		setBasketTrade('')
		setBasketName('')
		setBasketIdentifier(0)
		setSubTradeOptionList(initialSubTradeList)
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
		updatedBasketData({
			...basketInitialData,
			quantity: 1,
			action: 'B',
			expiry: 'Monthly',
			option: 'CE',
			tradeValue: 1,
			tradeOption: tradeTypeData[0].value,
			subTradeOption: tradeTypeData[0].children[0].value,
		})
		setSubTradeOptionList(tradeTypeData[0].children)
	}

	const handleAddBasket = (value: string) => {
		const uniqueId = generateUniqueId()
		setBasket((prev) => [
			...prev,
			value === 'spot'
				? {
						id: uniqueId,
						type: 'spot',
						entryCondition: {
							quantity: basketInitialData.quantity,
							actionType: basketInitialData.action,
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
							type: 'future',
							id: uniqueId,
							count: basket.length + 1,
							entryCondition: {
								quantity: basketInitialData.quantity,
								actionType: basketInitialData.action,
								expiry: basketInitialData.expiry,
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
							type: 'options',
							id: uniqueId,
							count: basket.length + 1,
							entryCondition: {
								quantity: basketInitialData.quantity,
								actionType: basketInitialData.action,
								expiry: basketInitialData.expiry,
								optionType: basketInitialData.option,
								tradeType: basketInitialData.tradeOption,
								tradeTypeParams: basketInitialData.subTradeOption,
								tradeTypeValue: basketInitialData.tradeValue,
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

	useEffect(() => {
		//	console.log(basketInitialData)
	}, [basketInitialData])
	const handleCopyBasket = (id: string) => {
		setPersistedValues({
			quantityValue: basketInitialData.quantity,
			actionValue: basketInitialData.action,
			expiry: basketInitialData.expiry || 'Monthly',
			optionType: basketInitialData.option || 'CE',
			tradeValue: basketInitialData.tradeValue || 1,
			tradeOption: basketInitialData.tradeOption || tradeTypeData[0].value,
			subTradeOption:
				basketInitialData.subTradeOption || tradeTypeData[0].children[0].value,
		})
		const basketToBeCopied = basket.find((basket) => basket.id === id)
		setPositionCopy(true)
		if (basketToBeCopied) {
			if (basketToBeCopied.type === 'spot') {
				updatedBasketData({
					...basketInitialData,
					action: basketToBeCopied.entryCondition.actionType,
					quantity: basketToBeCopied.entryCondition.quantity,
				})
			} else if (basketToBeCopied.type === 'future') {
				updatedBasketData({
					...basketInitialData,
					action: basketToBeCopied.entryCondition.actionType,
					quantity: basketToBeCopied.entryCondition.quantity,
					expiry: basketToBeCopied.entryCondition.expiry || 'Monthly',
				})
			} else if (basketToBeCopied.type === 'options') {
				updatedBasketData({
					...basketInitialData,
					action: basketToBeCopied.entryCondition.actionType,
					quantity: basketToBeCopied.entryCondition.quantity,
					expiry: basketToBeCopied.entryCondition.expiry,
					option: basketToBeCopied.entryCondition.optionType,
					tradeValue: basketToBeCopied.entryCondition.tradeTypeValue,
					tradeOption: basketToBeCopied.entryCondition.tradeType || 'Atmpt',
					subTradeOption: basketToBeCopied.entryCondition.tradeTypeParams,
				})
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
					backgroundColor: token.colorBgBase,
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
					backgroundColor: token.colorBgBase,
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
					height: '500px',
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
					basketInitialData={basketInitialData}
					updatedBasketData={updatedBasketData}
					instrument={instrument}
					subTradeOptionList={subTradeOptionList}
					handleAddBasket={handleAddBasket}
					setSubTradeOptionList={setSubTradeOptionList}
					setOptionValue={setOptionValue}
				/>
				{basket.length > 0 && (
					<DetailsContainer
						basket={basket}
						instrument={instrument}
						tradeOption={
							basketInitialData.tradeOption || tradeTypeData[0].value
						}
						subTradeOption={
							basketInitialData.subTradeOption ||
							tradeTypeData[0].children[0].value
						}
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
