import { Flex } from 'antd'
import AddBasketModal from './modals/add-new-basket'
import SaveBasket from './container/saved-basket-container'
import ConfirmModal from './modals/confitm-modal'
import BasketContainer from './container/baskets-container'
import EditBasketModal from './modals/edit-basket-modal'
import { useBasketStore } from './store/basket-store'
import BasketNav from '../basket/container/basket-nav'
const Basket = () => {
	const {
		isAddBasketModalOpen,
		duplicateError,
		isEditModalOpen,
		setDuplicateError,
		closeModalConfirmation,
		closeEditConfirmation,
		toogleEditModal,
		timeErrorModalOpen,
		toggleTimeErrorModalOpen,
		setEmptyBasketError,
		emptyBasketError,
	} = useBasketStore()

	const handleCloseConfirmModal = (val: boolean) => {
		toogleEditModal(false)
		closeEditConfirmation(val)
	}
	const handleCancelConfirmModal = (val: boolean) => {
		closeEditConfirmation(val)
	}

	const handleTimeErrorModalClose = () => {
		toggleTimeErrorModalOpen(false)
	}

	const handleEmptyBasketErrorModalClose = () => {
		setEmptyBasketError(false)
	}

	return (
		<>
			<BasketNav />
			<Flex className="h-[100vh] overflow-y-hidden overflow-x-hidden">
				<Flex flex={'1'}>
					<SaveBasket />
				</Flex>
				<Flex flex={3}>
					<BasketContainer />
				</Flex>
			</Flex>
			<EditBasketModal open={isEditModalOpen} />
			{<AddBasketModal open={isAddBasketModalOpen} />}
			<ConfirmModal
				open={duplicateError}
				handleOpen={setDuplicateError}
				handleCancel={setDuplicateError}
				header={'Duplicate Alert'}
				message="Basket with this name already exists"
			/>
			<ConfirmModal
				open={closeModalConfirmation}
				handleOpen={handleCloseConfirmModal}
				handleCancel={handleCancelConfirmModal}
				header={'Alert!'}
				message="Are you sure you want to close modal? All unsaved data will be lost!"
			/>
			<ConfirmModal
				open={timeErrorModalOpen}
				handleOpen={handleTimeErrorModalClose}
				handleCancel={handleTimeErrorModalClose}
				header={'Time Error!'}
				message="Exit Time Should be after Entry Time!"
			/>
			<ConfirmModal
				open={emptyBasketError}
				handleOpen={handleEmptyBasketErrorModalClose}
				handleCancel={handleEmptyBasketErrorModalClose}
				header={'Cannot Save Basket'}
				message="Basket should have atleast on position element to save."
			/>
		</>
	)
}

export default Basket
