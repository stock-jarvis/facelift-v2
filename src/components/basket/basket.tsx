import { Flex } from 'antd'
import AddBasketModal from './modals/add-new-basket'
import SaveBasket from './container/saved-basket-container'
import ConfirmModal from './modals/confitm-modal'
import BasketContainer from './container/baskets-container'
import EditBasketModal from './modals/edit-basket-modal'
import { useBasketStore } from './store/basket-store'

const Basket = () => {
	const {
		isAddModalOpen,
		duplicateError,
		editableBasketData,
		setDuplicateError,
		closeModalConfirmation,
		closeEditConfirmation,
		timeErrorModalOpen,
		toggleTimeErrorModalOpen,
		setEmptyBasketError,
		resetEditablebasket,
		emptyBasketError,
		runtimeDuplicate,
		closeDuplicateConfirmModal,
	} = useBasketStore()

	const handleCloseConfirmModal = (val: boolean) => {
		resetEditablebasket(), closeEditConfirmation(val)
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
			<Flex style={{ height: '100vh', overflow: 'hidden' }}>
				<Flex flex={'1'}>
					<SaveBasket />
				</Flex>
				<Flex flex={3}>
					<BasketContainer />
				</Flex>
			</Flex>
			{editableBasketData.id && <EditBasketModal />}
			{isAddModalOpen && <AddBasketModal />}
			{duplicateError && (
				<ConfirmModal
					open={duplicateError}
					handleOpen={setDuplicateError}
					handleCancel={setDuplicateError}
					header={'Duplicate Alert'}
					message="Basket with this name already exists"
				/>
			)}
			{closeModalConfirmation && (
				<ConfirmModal
					open={closeModalConfirmation}
					handleOpen={handleCloseConfirmModal}
					handleCancel={handleCancelConfirmModal}
					header={'Alert!'}
					message="Are you sure you want to close modal? All unsaved data will be lost!"
				/>
			)}
			{timeErrorModalOpen && (
				<ConfirmModal
					open={timeErrorModalOpen}
					handleOpen={handleTimeErrorModalClose}
					handleCancel={handleTimeErrorModalClose}
					header={'Time Error!'}
					message="Exit Time Should be after Entry Time!"
				/>
			)}
			{emptyBasketError && (
				<ConfirmModal
					open={emptyBasketError}
					handleOpen={handleEmptyBasketErrorModalClose}
					handleCancel={handleEmptyBasketErrorModalClose}
					header={'Cannot Save Basket'}
					message="Basket should have atleast one position element to save."
				/>
			)}
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
