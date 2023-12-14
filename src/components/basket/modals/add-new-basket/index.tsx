import Modal from 'antd/es/modal/Modal'
import ExhchangeSelector from '../../common/basket-exchange/exchange-selector'
import { Flex, Select, Input } from 'antd'

const Index = () => {
	//console.log(Modal)
	return (
		<Modal
			title="Add New Basket"
			open={true}
			width={700}
			okButtonProps={{ type: 'default' }}
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
