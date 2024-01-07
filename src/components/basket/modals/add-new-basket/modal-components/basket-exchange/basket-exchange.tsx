import { Flex, Select, SelectProps } from 'antd'

import { exchangeType } from '../../../../constants/data'
import { Exchange } from 'src/common/enums'

interface TradeSelectorProps {
	exchangeValue: Exchange
	handleTradeChange: (val: Exchange) => void
}
const TradeSelector: React.FC<TradeSelectorProps> = ({
	handleTradeChange,
	exchangeValue,
}) => {
	const handleTradeClick: SelectProps<Exchange>['onChange'] = (val) => {
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
