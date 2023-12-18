import { Flex } from 'antd'
import TradeType from './exchange-item'
import { exchangeType } from '../../constants/data'
//import { useBasketStore } from '../../store/basket-store'

interface TradeSelectorProps {
	exchangeValue: string
	handleTradeChange: (val: string) => void
}
const TradeSelector = ({
	handleTradeChange,
	exchangeValue,
}: TradeSelectorProps) => {
	const handleTradeClick = (val: string) => {
		handleTradeChange(val)
	}
	return (
		<Flex flex="1">
			{exchangeType.map((exchange) => (
				<TradeType
					key={exchange.id}
					exchangeValue={exchangeValue}
					{...exchange}
					onClick={() => handleTradeClick(exchange.type)}
				/>
			))}
		</Flex>
	)
}

export default TradeSelector
