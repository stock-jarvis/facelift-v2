import { create } from 'zustand'
import { SavedBasketsObject } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { defaultBasketData } from '../constants/data'

type BasketState = {
	endDate: string
	exchange: string
	startDate: string
	timeError: boolean
	duplicateError: boolean
	isEditModalOpen: boolean
	emptyBasketError: boolean
	timeErrorModalOpen: boolean
	isAddBasketModalOpen: boolean
	closeModalConfirmation: boolean
	savedBaskets: SavedBasketsObject[]
	storedBaskets: SavedBasketsObject[]
	selectedBaskets: SavedBasketsObject[]
	editableBasketData: SavedBasketsObject
	runtimeBasketList: SavedBasketsObject[]
}

type BasketStateActions = {
	selectAllBaskets: () => void
	resetEditablebasket: () => void
	setExchange: (val: string) => void
	setRuntimeError: (id: string) => void
	setTimeError: (error: boolean) => void
	setEditableBasket: (id: string) => void
	toogleEditModal: (open: boolean) => void
	deleteStoredBasket: (id: string) => void
	addToStoredBaskets: (id: string) => void
	updateRuntimeError: (id: string) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: boolean) => void
	setEmptyBasketError: (error: boolean) => void
	closeEditConfirmation: (value: boolean) => void
	addBasketToSelectedBaskets: (id: string) => void
	toogleSaveError: (id: string, error: boolean) => void
	addToSavedBasket: (basket: SavedBasketsObject) => void
	addNewRuntimeBasket: (basket: SavedBasketsObject) => void
	updateRuntimeBasketData: (basket: SavedBasketsObject) => void
	handleDateChange: (startDate: string, endDate: string) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	toggleSetBasketModalOpen: (isAddBasketModalOpen: boolean) => void
	createDuplicateStoredBasket: (basket: SavedBasketsObject) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [
		{
			key: '1',
			id: '1',
			name: 'Apple',
			identifier: 0,
			exchange: 'NSE',
			ticker: 'Ticker-1',
			type: 'INTRA',
			atm: 'spot',
			exitCondition: {
				type: 'SQOL',
				totalLoss: 0,
				totalProfit: 0,
			},
		},
	],
	storedBaskets: [],
	exchange: 'NSE',
	startDate: '',
	endDate: '',
	selectedBaskets: [],
	duplicateError: false,
	isEditModalOpen: false,
	isAddBasketModalOpen: false,
	timeErrorModalOpen: false,
	closeModalConfirmation: false,
	editableBasketData: defaultBasketData,
	savedBaskets: [],
	timeError: false,
	emptyBasketError: false,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer(
		devtools((set) => ({
			...defaultState,

			setExchange: (exchange) => set({ exchange }),

			setTimeError: (timeError) => set({ timeError }),

			toogleEditModal: (isEditModalOpen) => set({ isEditModalOpen }),

			setEmptyBasketError: (emptyBasketError) => set({ emptyBasketError }),

			toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
				set({ isAddBasketModalOpen }),

			toggleTimeErrorModalOpen: (timeErrorModalOpen) =>
				set({ timeErrorModalOpen }),

			resetEditablebasket: () =>
				set((state) => void (state.editableBasketData = defaultBasketData)),

			closeEditConfirmation: (value: boolean) =>
				set((state) => {
					state.closeModalConfirmation = value
				}),

			handleDateChange: (startDate: string, endDate: string) =>
				set((state) => {
					state.startDate = startDate
					state.endDate = endDate
				}),

			updateRuntimeBasketData: (basket: SavedBasketsObject) =>
				set((state) => {
					const index = state.runtimeBasketList.findIndex(
						(b) => b.id === basket.id
					)
					state.runtimeBasketList[index] = basket
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

			addNewRuntimeBasket: (newBasket: SavedBasketsObject) =>
				set((state) => {
					void state.runtimeBasketList.push(newBasket)
				}),

			addToSavedBasket: (basket: SavedBasketsObject) =>
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

			setEditableBasket: (id: string) =>
				set((state) => {
					const data = state.runtimeBasketList.find(
						(basket) => basket.id === id
					)
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
			createDuplicateStoredBasket: (basket: SavedBasketsObject) =>
				set((state) => {
					void state.storedBaskets.push(basket)
				}),
		}))
	)
)
