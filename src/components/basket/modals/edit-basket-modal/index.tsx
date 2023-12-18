import { useState, useEffect } from 'react'
import { Modal, theme, Flex, Form } from 'antd'

import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
import Toggle from './modal-components/toggle'
import FututeBasketDetails from './modal-containers/future-basket-details'
import OptionBasketDetail from './modal-containers/options-basket-details'
import SpotBasketDetail from './modal-containers/spot-basket-detail'
import ExitCondition from './modal-containers/exit-condition'
import OptionsBasketSelector from './modal-containers/options-basket-selector'
import SpotBasketSelector from './modal-containers/spot-basket-selector'
import FutureBasketSelector from './modal-containers/future-basket-selector'
import PositionSelector from './modal-containers/position-selector'
import { generateUniqueId } from '../../common/utils/randomizer'
import { useBasketStore } from '../../store/basket-store'
import {
	futureExpiry,
	optionExpiry,
	tradeTypeData,
	totalProfitOptions,
	spotLossOptions,
} from '../../constants/data'

import { nseTimes, mxcTimes, curTimes } from '../../constants/entry-exit-time'

import {
	OptionObject,
	TradeOptions,
	BasketDataProps,
	TimeHours,
	Time,
} from '../../types/types'
import { basketOptions } from '../../constants/data'

const initialSubTrade = tradeTypeData[0].children[0].value
const initialSubTradeList = tradeTypeData[0].children
const initialTrade = tradeTypeData[0].value

const defaultSpotPosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	type: 'spot',
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
}

const defaultFuturePosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	type: 'future',
	expiry: 'Monthly',
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
}

const defaultOptionsPosition: BasketDataProps = {
	id: generateUniqueId(),
	qunatity: 1,
	action_type: 'B',
	stop_loss_value: 0,
	total_profit_value: 0,
	stop_loss_type: spotLossOptions[0].value,
	total_profit_type: totalProfitOptions[0].value,
	option_type: 'CE',
	type: 'options',
	expiry: 'Monthly',
	trade_type: tradeTypeData[0].value,
	trade_type_params: tradeTypeData[0].children[0].value,
	trade_type_value: 1,
}

interface EditModalProps {
	open: boolean
}

const EditBasketModal = ({ open }: EditModalProps) => {
	const { editableBasketData } = useBasketStore()

	const { token } = theme.useToken()

	const [basketTrade, setBasketTrade] = useState<string>()
	const [basketName, setBasketName] = useState<string>()
	const [instrument, setInstrument] = useState<string>()
	const [basket, setBasket] = useState<BasketDataProps[]>([])
	const [basketOption, setBasketOption] = useState<string>('spot')
	const [basketIdentifier, setBasketIdentifier] = useState<number>()
	const [quantityValue, setQuantityValue] = useState<number>(1)
	const [actionValue, setActionValue] = useState<string>('B')
	const [optionType, setOptionType] = useState<string>('CE')
	const [futureExpiryList] = useState<OptionObject[]>(futureExpiry)
	const [optionExpiryList] = useState<OptionObject[]>(optionExpiry)
	const [tradeOption, setTradeOption] = useState<string>(initialTrade)
	const [tradeValue, setTradeValue] = useState<number>(1)
	const [subTradeOption, setSubTradeOption] = useState<string>(initialSubTrade)
	const [subTradeOptionList, setSubTradeOptionList] =
		useState<TradeOptions[]>(initialSubTradeList)
	const [futureExpiryBaseValue, setFutureExpiryBaseValue] =
		useState<string>('Monthly')
	const [optionExpiryBaseValue, setOptionExpiryBaseValue] =
		useState<string>('Monthly')

	const [entryHourList, setEntryHourList] = useState<TimeHours[]>()
	const [entryMinuteList, setEntryMinuteList] = useState<Time[]>()
	const [currentEntryHour, setCurrentEntryHour] = useState<number>()
	const [currentEntryMinute, setCurrentEntryMinute] = useState<number>()

	const [exitHourList, setExitHourList] = useState<TimeHours[]>()
	const [exitMinuteList, setExitMinuteList] = useState<Time[]>()
	const [currentExitHour, setCurrentExitHour] = useState<number>()
	const [currentExitMinute, setCurrentExitMinute] = useState<number>()

	const handleAfterClose = () => {
		setBasket([])
		setBasketTrade('')
		setInstrument('')
		setBasketOption('spot')
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setTradeOption(initialTrade)
		setSubTradeOption(initialSubTrade)
		setSubTradeOptionList(initialSubTradeList)
		setFutureExpiryBaseValue('Monthly')
		setOptionExpiryBaseValue('Monthly')
		setCurrentExitHour(-1)
		setCurrentExitMinute(-1)
		setCurrentEntryHour(-1)
		setCurrentEntryMinute(-1)
		setExitMinuteList([])
		setEntryHourList([])
		setExitHourList([])
		setEntryMinuteList([])
	}

	useEffect(() => {
		if (!entryHourList || entryHourList.length === 0) {
			if (editableBasketData.exchange) {
				if (editableBasketData.exchange === 'NSE') {
					setEntryHourList(nseTimes)
					setEntryMinuteList(nseTimes[0].minutes)
					setCurrentEntryHour(nseTimes[0].value)
					setCurrentEntryMinute(nseTimes[0].minutes[0].value)
				} else if (editableBasketData.exchange === 'MCX') {
					setEntryHourList(mxcTimes)
					setEntryMinuteList(mxcTimes[0].minutes)
					setCurrentEntryHour(mxcTimes[0].value)
					setCurrentEntryMinute(mxcTimes[0].minutes[0].value)
				} else {
					setEntryHourList(curTimes)
					setEntryMinuteList(curTimes[0].minutes)
					setCurrentEntryHour(curTimes[0].value)
					setCurrentEntryMinute(curTimes[0].minutes[0].value)
				}
			}
		}
	}, [editableBasketData, entryHourList])

	useEffect(() => {
		if (!exitHourList || exitHourList.length === 0) {
			if (editableBasketData.exchange) {
				if (editableBasketData.exchange === 'NSE') {
					setExitHourList(nseTimes)
					setExitMinuteList(nseTimes[nseTimes.length - 1].minutes)
					setCurrentExitHour(nseTimes[nseTimes.length - 1].value)
					const minutes = nseTimes[nseTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				} else if (editableBasketData.exchange === 'MCX') {
					setExitHourList(mxcTimes)
					setExitMinuteList(mxcTimes[mxcTimes.length - 1].minutes)
					setCurrentExitHour(mxcTimes[mxcTimes.length - 1].value)
					const minutes = mxcTimes[mxcTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				} else {
					setExitHourList(curTimes)
					setExitMinuteList(curTimes[curTimes.length - 1].minutes)
					setCurrentExitHour(curTimes[curTimes.length - 1].value)
					const minutes = curTimes[curTimes.length - 1].minutes
					const finalMiutes = minutes[minutes.length - 1]
					setCurrentExitMinute(finalMiutes.value)
				}
			}
		}
	}, [editableBasketData, exitHourList])

	useEffect(() => {
		if (!basketTrade) {
			setBasketTrade(editableBasketData.exchange)
		}
	}, [editableBasketData, basketTrade])

	useEffect(() => {
		if (!basketIdentifier) {
			setBasketIdentifier(editableBasketData.identifier)
		}
	}, [editableBasketData, basketIdentifier])

	useEffect(() => {
		if (!basketName) {
			setBasketName(editableBasketData.name)
		}
	}, [editableBasketData, basketName])
	useEffect(() => {
		if (!instrument) {
			setInstrument(editableBasketData.instrument)
		}
	}, [editableBasketData, instrument])
	const setToogleValue = (value: string) => {
		value
	}
	const setOptionValue = (value: OptionObject) => {
		setQuantityValue(1)
		setActionValue('B')
		setOptionType('CE')
		setOptionExpiryBaseValue('Monthly')
		setFutureExpiryBaseValue('Monthly')
		setBasketOption(value.value)
		setTradeValue(1)
		setTradeOption(tradeTypeData[0].value)
		setSubTradeOption(tradeTypeData[0].children[0].value)
		setSubTradeOptionList(tradeTypeData[0].children)
	}

	const handleAddBasket = (value: string) => {
		setBasket((prev) => [
			...prev,
			value === 'spot'
				? defaultSpotPosition
				: value === 'future'
					? defaultFuturePosition
					: defaultOptionsPosition,
		])
	}

	const handleDeleteBasket = (id: string) => {
		setBasket(basket.filter((basket) => basket.id !== id))
	}

	const handleCopyBasket = (id: string) => {
		const basketToBeCopied = basket.find((basket) => basket.id === id)
		if (basketToBeCopied) {
			setBasket((prev) => [
				...prev,
				{ ...basketToBeCopied, id: generateUniqueId() },
			])
		}
	}

	useEffect(() => {
		//console.log(basket)
	}, [basket])
	return (
		<Modal
			open={open}
			width={1200}
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
			footer={<Footer identifier={basketIdentifier} basketName={basketName} />}
			styles={{
				content: {
					margin: -60,
					padding: 0,
				},
				header: {
					backgroundColor: token.colorPrimary,
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
			<Form preserve={false}>
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
								backgroundColor: '#F1F8FF',
								borderRadius: token.borderRadiusLG,
							}}
						>
							<div className="w-[50%]">
								<Toggle
									toogle1="INTRADAY"
									toogle2="POSITIONAL"
									setToogleValue={setToogleValue}
								/>
							</div>
							<PositionSelector
								options={basketOptions}
								onOptionChange={setOptionValue}
							/>
							<div className="w-[50%]">
								<Toggle
									toogle1="Spot as ATM"
									toogle2="Future as ATM"
									setToogleValue={setToogleValue}
								/>
							</div>
						</Flex>
						<Flex className="w-[95%] self-center">
							{basketOption === 'spot' ? (
								<SpotBasketSelector
									baseQuantityValue={quantityValue}
									baseActionValue={actionValue}
									baseInstrumentValue={instrument || ''}
									handleBaseActionChange={setActionValue}
									handleAddBasket={handleAddBasket}
									handleBaseQuantityChange={setQuantityValue}
								/>
							) : basketOption === 'future' ? (
								<FutureBasketSelector
									futureExpiryBaseValue={futureExpiryBaseValue}
									futureExpiryList={futureExpiryList}
									baseQuantityValue={quantityValue}
									baseActionValue={actionValue}
									baseInstrumentValue={instrument || ''}
									handleBaseActionChange={setActionValue}
									handleBaseExpiryChange={setFutureExpiryBaseValue}
									handleAddBasket={handleAddBasket}
									handleBaseQuantityChange={setQuantityValue}
								/>
							) : (
								<OptionsBasketSelector
									optionExpiryBaseValue={optionExpiryBaseValue}
									optionExpiryList={optionExpiryList}
									baseQuantityValue={quantityValue}
									baseActionValue={actionValue}
									baseOptionValue={optionType}
									baseSubTradeOption={subTradeOption}
									baseInstrumentValue={instrument || ''}
									baseTradeValue={tradeValue}
									baseTradeOption={tradeOption}
									baseSubTradeOptionList={subTradeOptionList}
									handleBaseExpiryChange={setOptionExpiryBaseValue}
									handleAddBasket={handleAddBasket}
									handleBaseQuantityChange={setQuantityValue}
									handleBaseActionChange={setActionValue}
									handleBaseOptionChange={setOptionType}
									handleBaseTradeValueChange={setTradeValue}
									handleBaseTradeChange={setTradeOption}
									handleBaseSubTradeChange={setSubTradeOption}
									handleBaseSubTradeListChange={setSubTradeOptionList}
								/>
							)}
						</Flex>

						{basket?.map((bask) =>
							bask.type === 'spot' ? (
								<SpotBasketDetail
									key={bask.id}
									id={bask.id}
									basket={basket}
									handleEditBasket={setBasket}
									baseQuanity={quantityValue}
									baseInstrumentValue={instrument || ''}
									baseActionValue={actionValue}
									handleDeleteBasket={handleDeleteBasket}
									handleCopyBasket={handleCopyBasket}
								/>
							) : bask.type === 'future' ? (
								<FututeBasketDetails
									key={bask.id}
									id={bask.id}
									baseQuanity={quantityValue}
									baseInstrumentValue={instrument || ''}
									baseActionValue={actionValue}
									futureExpiryBaseValue={futureExpiryBaseValue}
									futureExpiryList={futureExpiryList}
									basket={basket}
									handleEditBasket={setBasket}
									handleDeleteBasket={handleDeleteBasket}
									handleCopyBasket={handleCopyBasket}
								/>
							) : (
								<OptionBasketDetail
									key={bask.id}
									id={bask.id}
									baseQuanity={quantityValue}
									optionExpiryBaseValue={optionExpiryBaseValue}
									baseActionValue={actionValue}
									baseOptionValue={optionType}
									baseInstrumentValue={instrument || ''}
									optionExpiryList={optionExpiryList}
									baseSubTradeOption={subTradeOption}
									baseTradeOption={tradeOption}
									baseSubTradeOptionList={subTradeOptionList}
									baseTradeValue={tradeValue}
									basket={basket}
									handleEditBasket={setBasket}
									handleDeleteBasket={handleDeleteBasket}
									handleCopyBasket={handleCopyBasket}
								/>
							)
						)}
						{basket.length > 0 && (
							<ExitCondition
								entryHoursData={entryHourList}
								entryMinutesData={entryMinuteList}
								entryHourValue={currentEntryHour}
								handleChangeEntryHour={setCurrentEntryHour}
								entryMinuteValue={currentEntryMinute}
								handleChangeEntryMinute={setCurrentEntryMinute}
								handleEntryMinuteListChange={setEntryMinuteList}
								handleExitMinuteListChange={setExitMinuteList}
								exitHoursData={exitHourList}
								exitMinutesData={exitMinuteList}
								exitHourValue={currentExitHour}
								exitMinuteValue={currentExitMinute}
								handleChangeExitHour={setCurrentExitHour}
								handleChangeExitMinute={setCurrentExitMinute}
							/>
						)}
					</Flex>
				</Flex>
			</Form>
		</Modal>
	)
}

export default EditBasketModal
