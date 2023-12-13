import { Flex } from 'antd'
import TradeType from './trade-type-item'
import { useState } from 'react'

const TradeSelector = () => {
	const [trades, setTrades] = useState([
		{
			id: 1,
			name: 'NSE',
			vale: 'NSE',
			selected: true,
		},
		{
			id: 2,
			name: 'MCX',
			vale: 'MCX',
			selected: false,
		},
		{
			id: 3,
			name: 'CUR',
			vale: 'CUR',
			selected: false,
		},
	])
	function onHandleClick(data: number) {
		setTrades(
			trades.map((trade) =>
				trade.id === data
					? { ...trade, selected: true }
					: { ...trade, selected: false }
			)
		)
	}
	return (
		<Flex flex="1">
			{trades.map((trade) => (
				<TradeType key={trade.id} {...trade} onClick={onHandleClick} />
			))}
		</Flex>
	)
}

export default TradeSelector
