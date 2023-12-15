import { Flex } from 'antd'

import AddBasketModal from './modals/add-new-basket'
import SaveBasket from './container/saved-basket-container'
import BasketContainer from './container/baskets-container'
import { useBasketStore } from './store/basket-store'
import EditBasketModal from './modals/edit-basket-modal'
const Basket = () => {
	const { isAddBasketModalOpen } = useBasketStore()
	return (
		<>
			<EditBasketModal />
			{<AddBasketModal open={isAddBasketModalOpen} />}
			<Flex className="h-[100vh] overflow-y-hidden overflow-x-hidden">
				<Flex flex={'1'}>
					<SaveBasket />
				</Flex>
				<Flex flex={3}>
					<BasketContainer />
				</Flex>
			</Flex>
		</>
	)
}

export default Basket
