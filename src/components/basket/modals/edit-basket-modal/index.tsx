import { useState } from 'react'
import { Modal, theme, Flex, Typography, Divider } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
//import { useBasketValues } from './modal-hooks/useBasketValues'
import ExitCondition from './modal-containers/exit-condition'
import DetailsContainer from './modal-containers/detail-container'
import { generateUniqueId } from '../../common/utils/randomizer'
import { useBasketStore } from '../../store/basket-store'
import { usePersistState } from './modal-hooks/usePersistState'
import Selectors from './modal-containers/selector-container'

import { tradeTypeData } from '../../constants/data'
import {
	TradeOptions,
	BasketDataProps,
	PersistedValues,
	BasketDataValues,
	SavedBasketsObject,
} from '../../types/types'

const initialSubTradeList = tradeTypeData[0].children

interface EditModalProps {
	open: boolean
}

const EditBasketModal = ({ open }: EditModalProps) => {
	const {
		editableBasketData,
		//savedBaskets,
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
	const [basketData, setBasketData] =
		useImmer<SavedBasketsObject>(editableBasketData)
	//const [exitData, setExitData] = useImmer(editableBasketData.exitCondition)

	const { token } = theme.useToken()

	const [basket, setBasket] = useState<BasketDataProps[]>(
		editableBasketData.positions || []
	)
	const [repeatSl, setRepeatSl] = useState<string>('NA')
	const [lossValue, setLossValue] = useState<number>(0)
	const [basketName, setBasketName] = useState<string>('')
	const [profitValue, setProfitValue] = useState<number>(0)
	const [basketIdentifier, setBasketIdentifier] = useState<number>(0)
	//const [finalTradeType, setFinalTradeType] = useState<string>('SQAL')
	const [persistedValues, setPersistedValues] = useState<PersistedValues>()

	const [basketPositions, setBasketPositions] = useState<string>('INTRA')
	const [subTradeOptionList, setSubTradeOptionList] =
		useState<TradeOptions[]>(initialSubTradeList)

	usePersistState(
		basketInitialData,
		updatedBasketData,
		positionCopy,
		setPositionCopy,
		persistedValues
	)

	const handleAfterClose = () => {
		resetEditablebasket()
		setBasket([])
		setBasketData({ ...basketData, ticker: '', exchange: '', atm: '' })
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
		setBasketName('')
		setBasketIdentifier(0)
		setSubTradeOptionList(initialSubTradeList)
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
					currentEntryHour={0}
					currentEntryMinute={0}
					currentExitHour={0}
					currentExitMinute={0}
					id={'1'}
					exchange={basketData.exchange}
					instrument={basketData.ticker}
					basket={basket}
					basketMove={basketData.exitCondition.move || false}
					basketRepeat={basketData.exitCondition.repeat || 'NA'}
					basketTrade={basketData.exitCondition?.type || 'SQOL'}
					identifier={basketIdentifier}
					basketName={basketName}
					atm={basketData.atm}
					simpleType={basketPositions}
				/>
			}
			styles={{
				content: {
					backgroundColor: token.colorBgBase,
					margin: -30,
					padding: 0,
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
					trade={basketData.exchange}
					handleTradeChange={(val) =>
						setBasketData({ ...basketData, exchange: val })
					}
					instrument={basketData.ticker}
					handleInstrumentChange={(val) =>
						setBasketData({ ...basketData, ticker: val })
					}
					setBasketPositions={setBasketPositions}
					atm={basketData.atm}
					setAtm={(val) => {
						setBasketData({ ...basketData, atm: val })
					}}
				/>
				<Selectors
					basketInitialData={basketInitialData}
					updatedBasketData={updatedBasketData}
					instrument={basketData.ticker}
					subTradeOptionList={subTradeOptionList}
					handleAddBasket={handleAddBasket}
					setSubTradeOptionList={setSubTradeOptionList}
					setOptionValue={setOptionValue}
				/>
				{basket.length > 0 && (
					<DetailsContainer
						basket={basket}
						instrument={basketData.ticker}
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
							basketData={basketData}
							setBasketData={setBasketData}
							// moveSl={basketData.exitCondition.move || false}
							// setRepeatSl={setRepeatSl}
							// exchange={basketData.exchange}
							// entryHoursData={[]}
							// entryMinutesData={[]}
							// entryHourValue={0}
							// lossValue={basketData.exitCondition?.totalLoss || 0}
							// profitValue={basketData.exitCondition?.totalProfit || 0}
							// basketTradeType={basketData.exitCondition?.type || 'SQOL'}
							// entryMinuteValue={0}
							// exitHoursData={[]}
							// exitMinutesData={[]}
							// exitHourValue={0}
							// exitMinuteValue={0}
							// handleBasketTradeTypeChange={(val) => {
							// 	setBasketData({
							// 		...basketData,
							// 		exitCondition: { ...basketData.exitCondition, type: val },
							// 	})
							// }}
							// handleLossValueChange={setLossValue}
							// handleProfitValueChange={setProfitValue}
							// handleChangeEntryHour={(val) => {
							// 	console.log(val)
							// }}
							// setMoveSl={() => {
							// 	basketData.exitCondition.move
							// 		? setBasketData({
							// 				...basketData,
							// 				exitCondition: {
							// 					...basketData.exitCondition,
							// 					move: !basketData.exitCondition.move,
							// 				},
							// 			})
							// 		: setBasketData({
							// 				...basketData,
							// 				exitCondition: {
							// 					...basketData.exitCondition,
							// 					move: true,
							// 				},
							// 			})
							// }}
							// handleChangeEntryMinute={(val) => {
							// 	console.log(val)
							// }}
							// handleEntryMinuteListChange={(val) => {
							// 	console.log(val)
							// }}
							// handleExitMinuteListChange={(val) => {
							// 	console.log(val)
							// }}
							// handleChangeExitHour={(val) => {
							// 	console.log(val)
							// }}
							// handleChangeExitMinute={(val) => {
							// 	console.log(val)
							// }}
						/>
					</>
				)}
			</Flex>
		</Modal>
	)
}

export default EditBasketModal
