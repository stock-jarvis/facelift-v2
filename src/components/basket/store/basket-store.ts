import { create } from 'zustand'
import { SavedBasket, EditType } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { defaultBasketData } from '../constants/data'
import { Exchange } from 'src/common/enums'
import dayjs, { Dayjs } from 'dayjs'
type BasketState = {
	endDate: Dayjs
	startDate: Dayjs
	exchange: Exchange
	editType: EditType
	timeError: boolean
	duplicateError: boolean
	emptyBasketError: boolean
	runtimeDuplicate: boolean
	timeErrorModalOpen: boolean
	isAddBasketModalOpen: boolean
	closeModalConfirmation: boolean
	savedBaskets: SavedBasket[]
	storedBaskets: SavedBasket[]
	selectedBaskets: SavedBasket[]
	editableBasketData: SavedBasket
	runtimeBasketList: SavedBasket[]
}

type BasketStateActions = {
	selectAllBaskets: () => void
	resetEditablebasket: () => void
	clearSelectedBaskets: () => void
	setExchange: (exchange: Exchange) => void
	setRuntimeError: (id: string) => void
	setTimeError: (error: boolean) => void
	deleteStoredBasket: (id: string) => void
	addToStoredBaskets: (id: string) => void
	updateRuntimeError: (id: string) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: boolean) => void
	setEmptyBasketError: (error: boolean) => void
	moveStoredToRuntimeBasket: (id: string) => void
	closeEditConfirmation: (value: boolean) => void
	addBasketToSelectedBaskets: (id: string) => void
	closeDuplicateConfirmModal: (value: boolean) => void
	setEditableBasket: (id: string, type: EditType) => void
	toogleSaveError: (id: string, error: boolean) => void
	addToSavedBasket: (basket: SavedBasket) => void
	addNewRuntimeBasket: (basket: SavedBasket) => void
	updateRuntimeBasketData: (basket: SavedBasket) => void
	handleDateChange: (startDate: Dayjs, endDate: Dayjs) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	toggleSetBasketModalOpen: (isAddBasketModalOpen: boolean) => void
	createDuplicateStoredBasket: (basket: SavedBasket) => void
}

const defaultState: BasketState = {
	endDate: dayjs(''),
	editType: EditType.NILL,
	startDate: dayjs(''),
	exchange: Exchange.NSE,
	savedBaskets: [],
	timeError: false,
	storedBaskets: [],
	selectedBaskets: [],
	runtimeDuplicate: false,
	runtimeBasketList: [],
	duplicateError: false,
	emptyBasketError: false,
	timeErrorModalOpen: false,
	isAddBasketModalOpen: false,
	closeModalConfirmation: false,
	editableBasketData: defaultBasketData,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer(
		devtools((set) => ({
			...defaultState,

			setExchange: (exchange) => set({ exchange }),

			setTimeError: (timeError) => set({ timeError }),

			setEmptyBasketError: (emptyBasketError) => set({ emptyBasketError }),

			toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
				set({ isAddBasketModalOpen }),

			toggleTimeErrorModalOpen: (timeErrorModalOpen) =>
				set({ timeErrorModalOpen }),

			closeDuplicateConfirmModal: (runtimeDuplicate) =>
				set({ runtimeDuplicate }),

			clearSelectedBaskets: () =>
				set((state) => {
					state.selectedBaskets = []
				}),

			resetEditablebasket: () =>
				set((state) => {
					state.editType = EditType.NILL
					void (state.editableBasketData = defaultBasketData)
				}),

			closeEditConfirmation: (value: boolean) =>
				set((state) => {
					state.closeModalConfirmation = value
				}),

			handleDateChange: (startDate: Dayjs, endDate: Dayjs) =>
				set((state) => {
					state.startDate = startDate
					state.endDate = endDate
				}),

			updateRuntimeBasketData: (basket: SavedBasket) =>
				set((state) => {
					if (state.editType === 'runtime') {
						const index = state.runtimeBasketList.findIndex(
							(b) => b.id === basket.id
						)
						state.runtimeBasketList[index] = basket
					} else {
						const index = state.storedBaskets.findIndex(
							(b) => b.id === basket.id
						)
						state.storedBaskets[index] = basket
					}
				}),

			setRuntimeError: (id) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((b) =>
						b.id === id ? { ...b, error: true } : b
					)
				}),

			updateRuntimeError: (id) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((b) =>
						b.id === id ? { ...b, error: false } : b
					)
				}),

			setDuplicateError: (err: BasketState['duplicateError']) =>
				set((state) => {
					state.duplicateError = err
				}),

			addNewRuntimeBasket: (newBasket: SavedBasket) =>
				set((state) => {
					void state.runtimeBasketList.push(newBasket)
				}),

			addToSavedBasket: (basket: SavedBasket) =>
				set((state) => {
					const checkIfExists = state.savedBaskets.find(
						(b) => b.id === basket.id
					)
					if (checkIfExists) {
						state.savedBaskets = state.savedBaskets.map((b) => {
							if (b.id === basket.id) {
								return basket
							} else {
								return b
							}
						})
					} else {
						void state.savedBaskets.push(basket)
					}
				}),

			addBasketToSelectedBaskets: (id) =>
				set((state) => {
					const basket = state.runtimeBasketList.find((b) => b.id === id)
					if (basket) {
						const data = state.selectedBaskets.find((b) => b.id === id)
						if (!data) {
							void state.selectedBaskets.push(basket)
						} else {
							state.selectedBaskets = state.selectedBaskets.filter(
								(b) => b.id !== id
							)
						}
					}
				}),

			selectAllBaskets: () =>
				set((state) => {
					if (state.runtimeBasketList.length !== state.selectedBaskets.length) {
						state.selectedBaskets = state.runtimeBasketList
					} else {
						state.selectedBaskets = []
					}
				}),

			toogleSaveError: (id: string, error: boolean) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((basket) =>
						basket.id === id ? { ...basket, error: error } : { ...basket }
					)
				}),

			deleteStoredBasket: (id: string) =>
				set((state) => {
					state.storedBaskets = state.storedBaskets.filter((basket) => {
						return basket.id !== id
					})
				}),

			deleteRuntimeBasket: (id: string) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.filter((basket) => {
						return basket.id !== id
					})
				}),

			setEditableBasket: (id: string, type: EditType) =>
				set((state) => {
					state.editType = type
					const dataToBeExtracted =
						type === EditType.RUNTIME
							? state.runtimeBasketList
							: state.storedBaskets
					const data = dataToBeExtracted.find((basket) => basket.id === id)
					if (data) {
						state.editableBasketData = data
					}
				}),

			addToStoredBaskets: (id: string) =>
				set((state) => {
					const basket = state.runtimeBasketList.find((b) => b.id === id)
					if (basket) {
						const checkIfExists = state.storedBaskets.find(
							(b) => b.id === basket.id
						)

						if (checkIfExists) {
							state.storedBaskets = state.storedBaskets.map((b) => {
								if (b.id === basket.id) {
									return { ...basket, identifier: b.identifier }
								} else {
									return b
								}
							})
						} else {
							const checkNames = state.storedBaskets.filter(
								(b) => b.name === basket.name
							)

							if (checkNames && checkNames.length > 0) {
								const maxIdentifier = Math.max(
									...checkNames.map((b) => b.identifier)
								)

								void state.storedBaskets.push({
									...basket,
									identifier: maxIdentifier + 1,
								})
							} else {
								void state.storedBaskets.push(basket)
							}
						}
					}
				}),

			createDuplicateStoredBasket: (basket: SavedBasket) =>
				set((state) => {
					void state.storedBaskets.push(basket)
				}),
			moveStoredToRuntimeBasket: (id: string) =>
				set((state) => {
					const checkIfExists = state.runtimeBasketList.find((b) => b.id === id)
					if (!checkIfExists) {
						const basket = state.storedBaskets.find((b) => b.id === id)
						if (basket) {
							const newBasket = state.runtimeBasketList.filter(
								(b) => b.name === basket.name
							)
							if (!newBasket) {
								void state.runtimeBasketList.push(basket)
							} else {
								void state.runtimeBasketList.push({
									...basket,
									identifier: newBasket[newBasket.length - 1].identifier + 1,
								})
							}
						}
					} else {
						state.runtimeDuplicate = true
					}
				}),
		}))
	)
)
