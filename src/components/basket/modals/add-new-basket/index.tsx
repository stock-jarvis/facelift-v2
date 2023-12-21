import { Modal, Flex, Button, Select, Input, Typography, theme } from 'antd'
import ExhchangeSelector from '../../common/basket-exchange/exchange-selector'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from '../../store/basket-store'
import { useState, ChangeEvent } from 'react'
import { SelectProps, InputProps } from 'antd'
import { generateUniqueId } from '../../common/utils/randomizer'
interface ModalProps {
	open: boolean
}

const Index = ({ open }: ModalProps) => {
	const { token } = theme.useToken()
	const [exhange, setExchange] = useState<string>('NSE')
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
					instrument: instrument,
					exchange: exhange,
					identifier: 0,
					error: false,
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
		setExchange('NSE')
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
					<Typography.Text
						style={{
							color: token.colorBgBase,
							fontWeight: token.fontWeightStrong,
							fontSize: token.fontSize,
						}}
					>
						Add New Basket
					</Typography.Text>
					<CloseOutlined
						onClick={onModalClose}
						style={{ color: token.colorBgBase, paddingInline: token.paddingSM }}
					/>
				</Flex>
			}
			footer={
				<Flex style={{ padding: token.paddingSM }} justify="flex-end">
					<Button onClick={onModalClose} type="primary">
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
				header: { backgroundColor: token.colorPrimary },
				body: { padding: token.paddingSM, paddingTop: 0, paddingBottom: 0 },
			}}
		>
			<Flex vertical gap="large">
				<Flex className="w-[40%] shadow-sm">
					<ExhchangeSelector
						exchangeValue={exhange}
						handleTradeChange={setExchange}
					/>
				</Flex>
				<Flex flex={1} vertical gap="middle">
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
			</Flex>
		</Modal>
	)
}

export default Index
