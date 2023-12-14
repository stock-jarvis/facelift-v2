import { Flex } from 'antd'
import Theme from './theme'
import AddBasketModal from './modals/add-new-basket'
import SaveBasket from './container/saved-basket-container'
import BasketContainer from './container/baskets-container'
//import { useToggle } from './hooks/useToggleModal'
const Basket = () => {
	//const [isModalOpen] = useToggle()
	return (
		<Theme>
			{<AddBasketModal />}
			<Flex className="h-[100vh] overflow-y-hidden overflow-x-hidden">
				<Flex flex={'1'}>
					<SaveBasket />
				</Flex>
				<Flex flex={3}>
					<BasketContainer />
				</Flex>
			</Flex>
		</Theme>
	)
}

export default Basket
