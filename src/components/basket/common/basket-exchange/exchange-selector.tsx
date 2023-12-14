import { Flex } from 'antd'
import TradeType from './exchange-item'
import { exchangeType } from '../../constants/data'
import { useBasketStore } from '../../store/basket-store'
const TradeSelector = () => {
	const { setExchange } = useBasketStore()

	// change the exchange type and store it into redux
	function onHandleClick(data: number) {
		const selectedExchange = exchangeType.find(
			(exchange) => exchange.id === data
		)
		if (selectedExchange) setExchange(selectedExchange)
	}
	return (
		<Flex flex="1">
			{exchangeType.map((exchange) => (
				<TradeType key={exchange.id} {...exchange} onClick={onHandleClick} />
			))}
		</Flex>
	)
}

export default TradeSelector
