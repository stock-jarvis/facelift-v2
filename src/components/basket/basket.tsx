import { Flex } from 'antd'
import SaveBasket from './container/saved-basket-container'
import ConfirmModal from './modals/confitm-modal'
import BasketContainer from './container/baskets-container'
import EditBasketModal from './modals/edit-basket-modal'
import { useBasketStore } from './store/basket-store'

const Basket = () => {
	const { editableBasketData, runtimeDuplicate, closeDuplicateConfirmModal } =
		useBasketStore()

	return (
		<>
			<Flex style={{ height: '100vh', overflow: 'hidden' }}>
				<Flex flex={1}>
					<SaveBasket />
				</Flex>
				<Flex flex={3}>
					<BasketContainer />
				</Flex>
			</Flex>
			{editableBasketData.id && <EditBasketModal />}
			{runtimeDuplicate && (
				<ConfirmModal
					open={runtimeDuplicate}
					handleOpen={() => closeDuplicateConfirmModal(false)}
					handleCancel={() => closeDuplicateConfirmModal(false)}
					header={'Basket Exists'}
					message="This Basket Already exits in runtime section."
				/>
			)}
		</>
	)
}

export default Basket
