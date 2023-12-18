import { Modal } from 'antd'
import ExhchangeSelector from '../../common/basket-exchange/exchange-selector'
import { Flex, Select, Input } from 'antd'
import { useBasketStore } from '../../store/basket-store'
import { useState, ChangeEvent, useEffect } from 'react'
import { SelectProps, InputProps } from 'antd'
import { RunTimeBasketData } from '../../types/types'
import { generateUniqueId } from '../../common/utils/randomizer'
interface ModalProps {
	open: boolean
}

const Index = ({ open }: ModalProps) => {
	const [exhange, setExchange] = useState<string>('NSE')
	const { toggleSetBasketModalOpen, addNewRuntimeBasket } = useBasketStore()
	const [basketName, setBasketName] = useState<string>()
	const [instrument, setInstrument] = useState<string>()
	const [basketNameError, setBasketNameError] = useState<boolean>(false)
	const [basketInstrumentError, setBasketInstrumentError] =
		useState<boolean>(false)
	const [basketData, setBasketData] = useState<RunTimeBasketData>({
		id: '',
		instrument: '',
		name: '',
		exchange: '',
	})
	const onModalClose = () => {
		toggleSetBasketModalOpen(false)
	}

	useEffect(() => {
		//	console.log(basketData)
	}, [basketData])

	const onOkSelect = () => {
		if (basketName && instrument) {
			setBasketData({
				id: generateUniqueId(),
				name: basketName,
				instrument: instrument,
				exchange: exhange,
			})
			addNewRuntimeBasket({
				id: generateUniqueId(),
				name: basketName,
				instrument: instrument,
				exchange: exhange,
			})
			toggleSetBasketModalOpen(false)
		} else {
			if (!basketName) {
				setBasketNameError(true)
				if (!instrument) {
					console.log('hello world')
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
	return (
		<Modal
			title="Add New Basket"
			open={open}
			width={700}
			okButtonProps={{ type: 'default' }}
			onCancel={onModalClose}
			destroyOnClose
			onOk={onOkSelect}
			styles={{
				content: { marginTop: '80px' },
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
							borderColor: basketNameError ? 'red' : 'black',
						}}
						size="large"
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
						size="large"
						className="w-full"
						placeholder="Select an intument"
						options={[
							{ value: 'Ticter-1', label: 'Ticker-1' },
							{ value: 'Ticter-2', label: 'Ticker-2' },
							{ value: 'Ticter-3', label: 'Ticker-3' },
							{ value: 'Ticter-4', label: 'Ticker-4' },
						]}
					/>
				</Flex>
			</Flex>
		</Modal>
	)
}

export default Index
