import { useState, ChangeEvent, useEffect } from 'react'
import {
	Modal,
	Flex,
	Button,
	Select,
	Input,
	Typography,
	theme,
	notification,
} from 'antd'

import ExhchangeSelector from './modal-components/basket-exchange'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { SelectProps, InputProps } from 'antd'
import { generateUniqueId } from '../../utils/randomizer'
import { defaultNewBasket } from '../../constants/data'
import { Exchange } from 'src/common/enums'
import ConfirmModal from '../confitm-modal'
import { tickerData } from '../../constants/data'
import { fetchDataFromInstrumentAPI } from 'src/api/AuthService'

interface AddModalProps {
	handleModalToggle: () => void
}
const AddBasketModal = ({ handleModalToggle }: AddModalProps) => {
	const { token } = theme.useToken()
	const { addNewRuntimeBasket, savedBasket } = useBasketStore()
	const [basketName, setBasketName] = useState<string>()
	const [instrumentData, setInstrumentData] = useState<
		{ value: string; label: string }[]
	>([])
	const [instrument, setInstrument] = useState<string>()
	const [exhange, setExchange] = useState<Exchange>(Exchange.NSE)
	const [isDuplicate, setDuplicateError] = useState<boolean>(false)
	const [basketNameError, setBasketNameError] = useState<boolean>(false)

	const onModalClose = () => {
		handleModalToggle()
	}
	useEffect(() => {
		fetchData()
	}, [])

	const authTokenJSON = JSON.parse(localStorage.getItem('userData'))
	const fetchData = async () => {
		try {
			const response = await fetchDataFromInstrumentAPI(authTokenJSON)
			const tickerData = response.InstrumentList.map(
				(instrument: any, index: any) => ({
					value: instrument,
					label: instrument,
				})
			)
			setInstrumentData(tickerData)
		} catch (error) {
			notification.success({ message: 'Error While login' })
		}
	}

	const addNewBasket = () => {
		addNewRuntimeBasket({
			...defaultNewBasket,
			id: generateUniqueId(),
			name: `${exhange}-${basketName}`,
			ticker: instrument!,
			exchange: exhange,
		})
		handleModalToggle()
	}

	const handleAddClick = () => {
		if (basketName && instrument) {
			savedBasket.find((basket) => {
				const currName = basket.Name.substring(4)
				return currName === basketName
			})
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

	return (
		<Modal
			afterClose={handleAfterClose}
			title={
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
			}
			footer={
				<Flex style={{ padding: token.paddingSM }} justify="flex-end">
					<Button onClick={onModalClose} type="default">
						Cancel
					</Button>
					<Button onClick={handleAddClick} type="primary">
						Ok
					</Button>
				</Flex>
			}
			open={true}
			width={500}
			closeIcon={null}
			destroyOnClose={true}
			styles={{
				content: { marginTop: '80px', padding: 0 },
				body: { padding: token.paddingXS, paddingTop: 0, paddingBottom: 0 },
			}}
		>
			<Flex vertical gap="small">
				<ExhchangeSelector
					exchangeValue={exhange}
					handleTradeChange={setExchange}
				/>
				<Input
					value={basketName}
					onChange={handleInputChange}
					placeholder="Enter Basket Name"
					style={{ borderColor: basketNameError ? 'red' : '' }}
				/>
				<Select
					value={instrument}
					className={'w-full'}
					options={instrumentData}
					placeholder="Select an intument"
					onChange={handleInstrumentChange}
				/>
			</Flex>
			{isDuplicate && (
				<ConfirmModal
					open={isDuplicate}
					header="Duplicate Alert"
					handleOpen={setDuplicateError}
					handleCancel={setDuplicateError}
					message="Basket with this name already exists"
				/>
			)}
		</Modal>
	)
}

export default AddBasketModal
