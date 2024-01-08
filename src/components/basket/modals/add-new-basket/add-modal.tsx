import { Modal, Flex, Button, Select, Input, Typography, theme } from 'antd'
import ExhchangeSelector from './modal-components/basket-exchange'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { useState, ChangeEvent } from 'react'
import { SelectProps, InputProps } from 'antd'
import { generateUniqueId } from '../../utils/randomizer'
import {
	BasketType,
	Exchange,
	BasketAtm,
	BasketExitType,
} from 'src/common/enums'
interface ModalProps {
	open: boolean
}

const Index: React.FC<ModalProps> = ({ open }) => {
	const { token } = theme.useToken()
	const [exhange, setExchange] = useState<Exchange>(Exchange.NSE)
	const {
		toggleSetBasketModalOpen,
		addNewRuntimeBasket,
		runtimeBasketList,
		setDuplicateError,
	} = useBasketStore()
	const [basketName, setBasketName] = useState<string>()
	const [instrument, setInstrument] = useState<string>()
	const [basketNameError, setBasketNameError] = useState<boolean>(false)
	const [basketInstrumentError, setBasketInstrumentError] =
		useState<boolean>(false)

	const onModalClose = () => {
		toggleSetBasketModalOpen(false)
	}

	const onOkSelect = () => {
		if (basketName && instrument) {
			const checkDuplicateBasketName = runtimeBasketList.find(
				(basket) => basket.name === basketName
			)
			if (!checkDuplicateBasketName) {
				addNewRuntimeBasket({
					id: generateUniqueId(),
					name: basketName,
					ticker: instrument,
					exchange: exhange,
					identifier: 0,
					type: BasketType.INTRADAY,
					atm: BasketAtm.SPOT,
					positions: [],
					exitCondition: {
						type: BasketExitType.SQAL,
						totalLoss: 0,
						totalProfit: 0,
					},
				})
			} else {
				setDuplicateError(true)
			}

			toggleSetBasketModalOpen(false)
		} else {
			if (!basketName) {
				setBasketNameError(true)
				if (!instrument) {
					setBasketInstrumentError(true)
				}
			} else {
				setBasketInstrumentError(true)
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
		setBasketInstrumentError(false)
		setInstrument(value)
	}

	const handleAfterClose = () => {
		setBasketName('')
		setInstrument(undefined)
		setBasketNameError(false)
		setBasketInstrumentError(false)
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
					<Button onClick={onOkSelect} type="primary">
						Ok
					</Button>
				</Flex>
			}
			open={open}
			width={500}
			okButtonProps={{ type: 'default' }}
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
					style={{
						outline: basketInstrumentError ? 'red' : 'black',
					}}
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
	)
}

export default Index
