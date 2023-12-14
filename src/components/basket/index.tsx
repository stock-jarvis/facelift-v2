import { Flex } from 'antd'
import Theme from './theme'

import BasketNav from './container/baskets-container'

const Basket = () => {
	return (
		<Theme>
			<Flex vertical className="h-[100vh] overflow-y-hidden ">
				<BasketNav />
			</Flex>
		</Theme>
	)
}

export default Basket
