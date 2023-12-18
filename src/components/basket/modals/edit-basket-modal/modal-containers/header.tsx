import { Flex, Select, Space, theme } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useBasketStore } from 'src/components/basket/store/basket-store'
interface HeaderProps {
	trade: string | undefined
	instrument: string | undefined
	handleTradeChange: (val: string) => void
	handleInstrumentChange: (val: string) => void
}
const Header = ({
	trade,
	handleTradeChange,
	instrument,
	handleInstrumentChange,
}: HeaderProps) => {
	const { token } = theme.useToken()
	const { closeEditConfirmation } = useBasketStore()

	const handleCloseEditModal = () => {
		closeEditConfirmation(true)
	}
	return (
		<Flex align="center" flex="1">
			<Flex flex={1} gap={'middle'} justify="center">
				<Space>
					<Select
						value={trade}
						onChange={handleTradeChange}
						style={{ width: '100px' }}
						options={[
							{ id: 1, label: 'NSE', value: 'NSE' },
							{ id: 2, label: 'MCX', value: 'MCX' },
							{ id: 3, label: 'CUR', value: 'CUR' },
						]}
					/>
				</Space>

				<Space>
					<Select
						value={instrument}
						onChange={handleInstrumentChange}
						style={{ width: '100px' }}
						options={[
							{ id: 1, value: 'Ticker-1', label: 'Ticker-1' },
							{ id: 2, value: 'Ticker-2', label: 'Ticker-2' },
							{ id: 3, value: 'Ticker-3', label: 'Ticker-3' },
							{ id: 4, value: 'Ticker-4', label: 'Ticker-4' },
						]}
					/>
				</Space>
			</Flex>
			<Flex
				style={{
					padding: token.paddingXS,
				}}
			>
				<CloseOutlined
					style={{ color: '#ffffff' }}
					onClick={handleCloseEditModal}
				/>
			</Flex>
		</Flex>
	)
}

export default Header
