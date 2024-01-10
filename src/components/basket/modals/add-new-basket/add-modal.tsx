import { Modal, Flex, Button, Select, Input, Typography, theme } from 'antd'
import ExhchangeSelector from './modal-components/basket-exchange'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { useState, ChangeEvent } from 'react'
import { SelectProps, InputProps } from 'antd'
import { generateUniqueId } from '../../utils/randomizer'
import { defaultNewBasket } from '../../constants/data'
import { Exchange } from 'src/common/enums'
import ConfirmModal from '../confitm-modal'

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

	return (
		<>
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
				destroyOnClose
				styles={{
					content: { marginTop: '80px', padding: 0 },
					body: { padding: token.paddingXS, paddingTop: 0, paddingBottom: 0 },
				}}
			>
				<Flex vertical gap={'small'}>
					<Flex>
						<ExhchangeSelector
							exchangeValue={exhange}
							handleTradeChange={setExchange}
						/>
					</Flex>

					<Input
						style={{
							borderColor: basketNameError ? 'red' : '',
						}}
						placeholder="Enter Basket Name"
						value={basketName}
						onChange={handleInputChange}
					/>

					<Select
						value={instrument}
						onChange={handleInstrumentChange}
						className="w-full"
						placeholder="Select an intument"
						options={[
							{ value: 'Ticker-1', label: 'Ticker-1' },
							{ value: 'Ticker-2', label: 'Ticker-2' },
							{ value: 'Ticker-3', label: 'Ticker-3' },
							{ value: 'Ticker-4', label: 'Ticker-4' },
						]}
					/>
				</Flex>
			</Modal>
			{isDuplicate && (
				<ConfirmModal
					open={isDuplicate}
					handleOpen={setDuplicateError}
					handleCancel={setDuplicateError}
					header={'Duplicate Alert'}
					message="Basket with this name already exists"
				/>
			)}
		</>
	)
}

export default Index
