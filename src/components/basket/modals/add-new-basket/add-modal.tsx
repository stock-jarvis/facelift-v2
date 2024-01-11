import { useState, ChangeEvent } from 'react'
import {
	Modal,
	Flex,
	Button,
	Select,
	Input,
	Typography,
	theme,
	ModalProps,
} from 'antd'

import ExhchangeSelector, {
	ExchangeSelectorProps,
} from './modal-components/basket-exchange'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { SelectProps, InputProps } from 'antd'
import { generateUniqueId } from '../../utils/randomizer'
import { defaultNewBasket } from '../../constants/data'
import { Exchange } from 'src/common/enums'
import ConfirmModal from '../confitm-modal'
import { tickerData } from '../../constants/data'
import { ConfirmModalProps } from '../confitm-modal/modal-confirm'
interface AddModalProps {
	handleModalToggle: () => void
}
const Index = ({ handleModalToggle }: AddModalProps) => {
	const { token } = theme.useToken()
	const { addNewRuntimeBasket, runtimeBasketList } = useBasketStore()
	const [basketName, setBasketName] = useState<string>()
	const [instrument, setInstrument] = useState<string>()
	const [exhange, setExchange] = useState<Exchange>(Exchange.NSE)
	const [isDuplicate, setDuplicateError] = useState<boolean>(false)
	const [basketNameError, setBasketNameError] = useState<boolean>(false)

	const onModalClose = () => {
		handleModalToggle()
	}

	const addNewBasket = () => {
		addNewRuntimeBasket({
			...defaultNewBasket,
			id: generateUniqueId(),
			name: basketName,
			ticker: instrument!,
			exchange: exhange,
		})
		handleModalToggle()
	}

	const handleAddClick = () => {
		if (basketName && instrument) {
			runtimeBasketList.find((basket) => basket.name === basketName)
				? setDuplicateError(true)
				: addNewBasket()
		} else {
			if (!basketName) {
				setBasketNameError(true)
			}
		}
	}

	const handleInputChange: InputProps['onChange'] = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		setBasketNameError(false)
		setBasketName(event.target.value)
	}

	const handleInstrumentChange: SelectProps['onChange'] = (value: string) => {
		setInstrument(value)
	}

	const handleAfterClose = () => {
		setBasketName('')
		setInstrument('')
		setBasketNameError(false)
		setExchange(Exchange.NSE)
	}

	const addModalProps: ModalProps = {
		afterClose: handleAfterClose,
		title: (
			<Flex
				flex="1"
				justify="space-between"
				style={{
					padding: token.paddingXS,
				}}
			>
				<Typography.Text>Add New Basket</Typography.Text>
				<CloseOutlined onClick={onModalClose} />
			</Flex>
		),
		footer: (
			<Flex style={{ padding: token.paddingSM }} justify="flex-end">
				<Button onClick={onModalClose} type="default">
					Cancel
				</Button>
				<Button onClick={handleAddClick} type="primary">
					Ok
				</Button>
			</Flex>
		),
		open: true,
		width: 500,
		closeIcon: null,
		destroyOnClose: true,
		styles: {
			content: { marginTop: '80px', padding: 0 },
			body: { padding: token.paddingXS, paddingTop: 0, paddingBottom: 0 },
		},
	}

	const duplicateModalProps: ConfirmModalProps = {
		open: isDuplicate,
		header: 'Duplicate Alert',
		handleOpen: setDuplicateError,
		handleCancel: setDuplicateError,
		message: 'Basket with this name already exists',
	}

	const instrumentSelectProps: SelectProps = {
		value: instrument,
		className: 'w-full',
		options: tickerData,
		placeholder: 'Select an intument',
		onChange: handleInstrumentChange,
	}

	const nameInputProps: InputProps = {
		value: basketName,
		onChange: handleInputChange,
		placeholder: 'Enter Basket Name',
		style: { borderColor: basketNameError ? 'red' : '' },
	}

	const exchangeProps: ExchangeSelectorProps = {
		exchangeValue: exhange,
		handleTradeChange: setExchange,
	}

	return (
		<Modal {...addModalProps}>
			<Flex vertical gap="small">
				<ExhchangeSelector {...exchangeProps} />
				<Input {...nameInputProps} />
				<Select {...instrumentSelectProps} />
			</Flex>
			{isDuplicate && <ConfirmModal {...duplicateModalProps} />}
		</Modal>
	)
}

export default Index
