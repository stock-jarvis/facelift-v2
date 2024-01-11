import { useState } from 'react'
import { Modal, theme, Flex, ModalProps, FlexProps } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import ConfirmModal from '../confitm-modal'
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
import { ConfirmModalProps } from '../confitm-modal/modal-confirm'
import {
	defaultInitialLegValues,
	defaultBasketData,
	defaultLegsEXitCondition,
} from '../../constants/data'
import { BasketDataProps, SavedPosition, SavedBasket } from '../../types/types'

const EditBasketModal = () => {
	const { token } = theme.useToken()
	const [isPositionError, setPositionError] = useState<boolean>(false)
	const [isCofirmModalOpen, setCofirmModal] = useState<boolean>(false)
	const { editableBasketData, resetEditablebasket } = useBasketStore()
	const [basketInitialData, updatedBasketData] = useImmer<SavedPosition>(
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

	const togglePositionError = () => {
		setPositionError(!isPositionError)
	}
	const setOptionValue = () => {
		updatedBasketData(defaultInitialLegValues)
	}

	const createSpotBasket = (id: string, type: BasketLegType) => {
		return {
			id,
			type,
			entryCondition: {
				quantity: basketInitialData.quantity,
				actionType: basketInitialData.action,
			},
			count: position.length + 1,
			exitCondition: defaultLegsEXitCondition,
		}
	}

	const createFutureBasket = (id: string, type: BasketLegType) => {
		return {
			id,
			type,
			count: position.length + 1,
			entryCondition: {
				quantity: basketInitialData.quantity,
				actionType: basketInitialData.action,
				expiry: basketInitialData.expiry,
			},
			exitCondition: defaultLegsEXitCondition,
		}
	}

	const createOptionsBasket = (id: string, type: BasketLegType) => {
		return {
			id,
			type,
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
		}
	}

	const handleAddBasket = (value: BasketLegType) => {
		const uniqueId = generateUniqueId()
		setPosition((prev) => [
			...prev,
			value === BasketLegType.SPOT
				? createSpotBasket(uniqueId, value)
				: value === BasketLegType.FUTURE
					? createFutureBasket(uniqueId, value)
					: createOptionsBasket(uniqueId, value),
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

	const handleCloseConfirmModal = () => {
		resetEditablebasket(), setCofirmModal(false)
	}
	const handleCancelConfirmModal = () => {
		setCofirmModal(!isCofirmModalOpen)
	}

	const modalProps: ModalProps = {
		open: true,
		destroyOnClose: true,
		closeIcon: <CloseOutlined />,
		afterClose: handleAfterClose,
		onCancel: handleCancelConfirmModal,
		footer: (
			<Footer
				setPositionError={setPositionError}
				basketData={basketData}
				basket={position}
			/>
		),
		title: (
			<Flex style={{ padding: token.paddingXS }}>
				<Title {...basketData} />
			</Flex>
		),
		styles: {
			content: {
				padding: 0,
				margin: -50,
			},
		},
		width: window.innerWidth * 0.9,
	}

	const positionErrorProps: ConfirmModalProps = {
		open: isPositionError,
		header: 'Cannot Save Basket',
		message: 'Basket should have atleast one leg element to save.',
		handleOpen: togglePositionError,
		handleCancel: togglePositionError,
	}

	const closeModalProps: ConfirmModalProps = {
		open: isCofirmModalOpen,
		header: 'Alert!',
		message: 'Are you sure you want to close? All data will be lost!',
		handleOpen: handleCloseConfirmModal,
		handleCancel: handleCancelConfirmModal,
	}

	const parentWrapper: FlexProps = {
		vertical: true,
		gap: 'middle',
		style: {
			padding: token.paddingMD,
			height: '600px',
			overflowY: 'scroll',
			scrollBehavior: 'smooth',
		},
		children: null,
	}

	return (
		<>
			<Modal {...modalProps}>
				<Flex {...parentWrapper}>
					<Header basketData={basketData} setBasketData={setBasketData} />
					<Selectors
						instrument={basketData.ticker}
						basketInitialData={basketInitialData}
						setOptionValue={setOptionValue}
						handleAddBasket={handleAddBasket}
						updatedBasketData={updatedBasketData}
					/>
					<DetailsContainer
						basket={position}
						instrument={basketData.ticker}
						basketInitialData={basketInitialData}
						setBasket={setPosition}
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
			{isPositionError && <ConfirmModal {...positionErrorProps} />}
			{isCofirmModalOpen && <ConfirmModal {...closeModalProps} />}
		</>
	)
}
export default EditBasketModal
