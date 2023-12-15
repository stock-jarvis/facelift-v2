import Modal from 'antd/es/modal/Modal'
import ExhchangeSelector from '../../common/basket-exchange/exchange-selector'
import { Flex, Select, Input } from 'antd'
import { useBasketStore } from '../../store/basket-store'
interface ModalProps {
	open: boolean
}

const Index = ({ open }: ModalProps) => {
	const { toggleSetBasketModalOpen } = useBasketStore()
	// TODO: Add the functionality here
	const onModalClose = () => {
		toggleSetBasketModalOpen(false)
	}

	// TODO: Add the functionality here
	const onOkSelect = () => {
		toggleSetBasketModalOpen(false)
	}

	return (
		<Modal
			title="Add New Basket"
			open={open}
			width={700}
			okButtonProps={{ type: 'default' }}
			onCancel={onModalClose}
			onOk={onOkSelect}
		>
			<Flex vertical gap="large">
				<Flex className="w-[40%] shadow-sm">
					<ExhchangeSelector />
				</Flex>
				<Flex flex={1} vertical gap="middle">
					<Input size="large" placeholder="Enter Basket Name" />

					<Select
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
