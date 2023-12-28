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
import Selectors from './modal-containers/selector-container'

import {
	defaultInitialLegValues,
	defaultBasketData,
	defaultLegsEXitCondition,
} from '../../constants/data'
import {
	BasketDataProps,
	BasketDataValues,
	SavedBasketsObject,
} from '../../types/types'

interface EditModalProps {
	open: boolean
}

const EditBasketModal = ({ open }: EditModalProps) => {
	const { token } = theme.useToken()
	const { editableBasketData, resetEditablebasket, closeEditConfirmation } =
		useBasketStore()

	const [basketInitialData, updatedBasketData] = useImmer<BasketDataValues>(
		defaultInitialLegValues
	)
	const [basketData, setBasketData] =
		useImmer<SavedBasketsObject>(editableBasketData)
	const [basket, setBasket] = useState<BasketDataProps[]>(
		editableBasketData.positions || []
	)

	const handleAfterClose = () => {
		resetEditablebasket()
		setBasketData(defaultBasketData)
		setBasket([])
		updatedBasketData(defaultInitialLegValues)
	}

	const setOptionValue = () => {
		updatedBasketData(defaultInitialLegValues)
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
						exitCondition: defaultLegsEXitCondition,
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
							exitCondition: defaultLegsEXitCondition,
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
							exitCondition: defaultLegsEXitCondition,
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
		const basketToBeCopied = basket.find((basket) => basket.id === id)
		if (basketToBeCopied) {
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
					setOptionValue={setOptionValue}
					handleAddBasket={handleAddBasket}
				/>
				<DetailsContainer
					basket={basket}
					setBasket={setBasket}
					basketInitialData={basketInitialData}
					instrument={basketData.ticker}
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
