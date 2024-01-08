import { useState } from 'react'
import { Modal, theme, Flex } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useImmer } from 'use-immer'
import Header from './modal-containers/header'
import Footer from './modal-containers/footer'
import Title from './modal-containers/title-section'
import ExitCondition from './modal-containers/exit-condition'
import DetailsContainer from './modal-containers/detail-container'
import { generateUniqueId } from '../../utils/randomizer'
import { useBasketStore } from '../../store/basket-store'
import Selectors from './modal-containers/selector-container'
import { BasketLegType } from 'src/common/enums'
import {
	defaultInitialLegValues,
	defaultBasketData,
	defaultLegsEXitCondition,
} from '../../constants/data'
import {
	BasketDataProps,
	BasketDataValues,
	SavedBasket,
} from '../../types/types'

const EditBasketModal = () => {
	const { token } = theme.useToken()
	const { editableBasketData, resetEditablebasket, closeEditConfirmation } =
		useBasketStore()
	const [basketInitialData, updatedBasketData] = useImmer<BasketDataValues>(
		defaultInitialLegValues
	)
	const [basketData, setBasketData] = useImmer<SavedBasket>({
		...editableBasketData,
	})
	const [position, setPosition] = useState<BasketDataProps[]>(
		editableBasketData.positions || []
	)

	const handleAfterClose = () => {
		setPosition([])
		resetEditablebasket()
		setBasketData(defaultBasketData)
		updatedBasketData(defaultInitialLegValues)
	}

	const setOptionValue = () => {
		updatedBasketData(defaultInitialLegValues)
	}
	const handleAddBasket = (value: BasketLegType) => {
		const uniqueId = generateUniqueId()
		setPosition((prev) => [
			...prev,
			value === BasketLegType.SPOT
				? {
						id: uniqueId,
						type: BasketLegType.SPOT,
						entryCondition: {
							quantity: basketInitialData.quantity,
							actionType: basketInitialData.action,
						},
						count: position.length + 1,
						exitCondition: defaultLegsEXitCondition,
					}
				: value === BasketLegType.FUTURE
					? {
							type: BasketLegType.FUTURE,
							id: uniqueId,
							count: position.length + 1,
							entryCondition: {
								quantity: basketInitialData.quantity,
								actionType: basketInitialData.action,
								expiry: basketInitialData.expiry,
							},
							exitCondition: defaultLegsEXitCondition,
						}
					: {
							type: BasketLegType.OPTIONS,
							id: uniqueId,
							count: position.length + 1,
							entryCondition: {
								quantity: basketInitialData.quantity,
								actionType: basketInitialData.action,
								expiry: basketInitialData.expiry,
								optionType: basketInitialData.option,
								tradeType: basketInitialData.tradeOption,
								tradeTypeParams: basketInitialData.subTradeOption,
								tradeTypeValue: basketInitialData.tradeValue,
							},
							exitCondition: defaultLegsEXitCondition,
						},
		])
	}

	const handleDeleteBasket = (id: string) => {
		const filteredBaskets = position.filter((basket) => basket.id !== id)
		const refinedBaskets = filteredBaskets.map((basket, index) => ({
			...basket,
			count: index + 1,
		}))
		setPosition(refinedBaskets)
	}

	const handleCopyBasket = (id: string) => {
		const basketToBeCopied = position.find((basket) => basket.id === id)
		if (basketToBeCopied) {
			setPosition((prev) => [
				...prev,
				{
					...basketToBeCopied,
					count: position.length + 1,
					id: generateUniqueId(),
				},
			])
		}
	}

	return (
		<Modal
			open={true}
			width={window.innerWidth * 0.9}
			destroyOnClose={true}
			closeIcon={<CloseOutlined />}
			afterClose={handleAfterClose}
			onCancel={() => closeEditConfirmation(true)}
			footer={<Footer basketData={basketData} basket={position} />}
			title={
				<Flex style={{ padding: token.paddingXS }}>
					<Title {...basketData} />
				</Flex>
			}
			styles={{
				content: {
					padding: 0,
					margin: -50,
				},
			}}
		>
			<Flex
				vertical
				gap={'middle'}
				style={{
					padding: token.paddingMD,
					height: '600px',
					overflowY: 'scroll',
					scrollBehavior: 'smooth',
				}}
			>
				<Header basketData={basketData} setBasketData={setBasketData} />
				<Selectors
					basketInitialData={basketInitialData}
					updatedBasketData={updatedBasketData}
					instrument={basketData.ticker}
					setOptionValue={setOptionValue}
					handleAddBasket={handleAddBasket}
				/>
				<DetailsContainer
					basket={position}
					setBasket={setPosition}
					basketInitialData={basketInitialData}
					instrument={basketData.ticker}
					handleCopyBasket={handleCopyBasket}
					handleDeleteBasket={handleDeleteBasket}
				/>
				<ExitCondition
					basket={position}
					basketData={basketData}
					setBasketData={setBasketData}
				/>
			</Flex>
		</Modal>
	)
}
export default EditBasketModal
