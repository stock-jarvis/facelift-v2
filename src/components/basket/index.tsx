//import React from 'react'
import { Flex } from 'antd'
import Theme from './common/theme'
//import TradeItem from './common/exchange-selector'
import BasketItem from './common/basket-item'
const Basket = () => {
	return (
		<Theme>
			<Flex flex={1} vertical gap="middle">
				<BasketItem />
				<BasketItem />
				<BasketItem />
			</Flex>
		</Theme>
	)
}

export default Basket
