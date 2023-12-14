import { Flex } from 'antd'
import Theme from './theme'

import BasketNav from './container/baskets-container'

const Basket = () => {
	return (
		<Theme>
			<Flex vertical className="h-[100vh] relative overflow-y-hidden ">
				<div style={{ height: window.innerHeight }}>
					<BasketNav />
				</div>
			</Flex>
		</Theme>
	)
}

export default Basket
