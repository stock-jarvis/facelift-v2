import { Flex, Select } from 'antd'

import { exchangeType } from '../../../../constants/data'

interface TradeSelectorProps {
	exchangeValue: string
	handleTradeChange: (val: string) => void
}
const TradeSelector: React.FC<TradeSelectorProps> = ({
	handleTradeChange,
	exchangeValue,
}) => {
	const handleTradeClick = (val: string) => {
		handleTradeChange(val)
	}
	return (
		<Flex flex="1">
			<Select
				value={exchangeValue}
				options={exchangeType}
				onChange={handleTradeClick}
			/>
		</Flex>
	)
}

export default TradeSelector
