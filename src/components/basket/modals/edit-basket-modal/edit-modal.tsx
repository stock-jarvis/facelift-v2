import { useState } from 'react'
import { Modal, theme, Flex, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
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

const defaultInitialValues: BasketDataValues = {
	quantity: 1,
	action: 'B',
	option: 'CE',
	expiry: 'Monthly',
	tradeValue: 1,
	tradeOption: tradeTypeData[0].value,
	subTradeOption: 'ATM',
	instrument: '',
}

const defaultOuterData: SavedBasketsObject = {
	name: '',
	exchange: '',
	ticker: '',
	id: '',
	key: '',
	type: '',
	identifier: 0,
	atm: '',
	exitCondition: {
		totalLoss: 0,
		totalProfit: 0,
		move: false,
		repeat: '',
		type: '',
	},
}
interface EditModalProps {
	open: boolean
}

const EditBasketModal = ({ open }: EditModalProps) => {
	const { token } = theme.useToken()
	const {
		editableBasketData,
		positionCopy,
		setPositionCopy,
		resetEditablebasket,
		closeEditConfirmation,
	} = useBasketStore()

	const [basketInitialData, updatedBasketData] =
		useImmer<BasketDataValues>(defaultInitialValues)
	const [basketData, setBasketData] =
		useImmer<SavedBasketsObject>(editableBasketData)
	const [basket, setBasket] = useState<BasketDataProps[]>(
		editableBasketData.positions || []
	)
	const [persistedValues, setPersistedValues] = useState<PersistedValues>()

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
		setBasketData(defaultOuterData)
		setBasket([])
		updatedBasketData(defaultInitialValues)
		setSubTradeOptionList(initialSubTradeList)
	}

	const setOptionValue = () => {
		updatedBasketData(defaultInitialValues)
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
			width={window.innerWidth * 0.9}
			destroyOnClose={true}
			closeIcon={<CloseOutlined />}
			afterClose={handleAfterClose}
			onCancel={() => closeEditConfirmation(true)}
			footer={<Footer basketData={basketData} basket={basket} />}
			title={
				<Flex style={{ padding: token.paddingXS }}>
					<Typography.Text>Edit Baskets</Typography.Text>
				</Flex>
			}
			styles={{
				content: {
					padding: 0,
				},
			}}
		>
			<Flex
				vertical
				gap={'middle'}
				style={{
					padding: token.paddingMD,
					height: '500px',
					overflowY: 'scroll',
					scrollBehavior: 'smooth',
				}}
			>
				<Header basketData={basketData} setBasketData={setBasketData} />
				<Selectors
					basketInitialData={basketInitialData}
					updatedBasketData={updatedBasketData}
					instrument={basketData.ticker}
					subTradeOptionList={subTradeOptionList}
					handleAddBasket={handleAddBasket}
					setSubTradeOptionList={setSubTradeOptionList}
					setOptionValue={setOptionValue}
				/>
				<DetailsContainer
					basket={basket}
					setBasket={setBasket}
					instrument={basketData.ticker}
					tradeOption={basketInitialData.tradeOption || tradeTypeData[0].value}
					subTradeOption={
						basketInitialData.subTradeOption ||
						tradeTypeData[0].children[0].value
					}
					subTradeOptionList={subTradeOptionList}
					handleCopyBasket={handleCopyBasket}
					handleDeleteBasket={handleDeleteBasket}
				/>
				<ExitCondition
					basket={basket}
					basketData={basketData}
					setBasketData={setBasketData}
				/>
			</Flex>
		</Modal>
	)
}
export default EditBasketModal
