import { Flex } from 'antd'
import { useEffect } from 'react'
import AddBasketModal from './modals/add-new-basket'
import SaveBasket from './container/saved-basket-container'
import BasketContainer from './container/baskets-container'
import { useBasketStore } from './store/basket-store'
import ConfirmModal from './modals/confitm-modal'
import EditBasketModal from './modals/edit-basket-modal'
const Basket = () => {
	const {
		isAddBasketModalOpen,
		runtimeBasketList,
		duplicateError,
		setDuplicateError,
	} = useBasketStore()
	useEffect(() => {
		console.log(runtimeBasketList)
	}, [runtimeBasketList])
	return (
		<>
			<EditBasketModal />
			{<AddBasketModal open={isAddBasketModalOpen} />}
			<ConfirmModal
				open={duplicateError}
				handleOpen={setDuplicateError}
				header={'Duplicate Alert'}
				message="Basket with this name already exists"
			/>
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
