import { create } from 'zustand'
import { SavedBasketsObject } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { defaultBasketData } from '../constants/data'
import { generateUniqueId } from '../utils/randomizer'

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
	selectedBaskets: SavedBasketsObject[]
	runtimeBasketList: SavedBasketsObject[]
	editableBasketData: SavedBasketsObject
	/* complete json of runtime genetrated baskets */
	savedBaskets: SavedBasketsObject[]
	//****this is for the pre load baskets rom backend */
	storedBaskets: SavedBasketsObject[]
}

type BasketStateActions = {
	setTimeError: (error: boolean) => void
	setEmptyBasketError: (error: boolean) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
	setExchange: (val: string) => void
	setRuntimeError: (id: string) => void
	deleteStoredBasket: (id: string) => void
	addToStoredBaskets: (id: string) => void
	addToSavedBasket: (basket: SavedBasketsObject) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	handleDateChange: (startDate: string, endDate: string) => void
	resetEditablebasket: () => void
	closeEditConfirmation: (value: boolean) => void
	updateRuntimeBasketData: (basket: SavedBasketsObject) => void
	addNewRuntimeBasket: (basket: SavedBasketsObject) => void
	addBasketToSelectedBaskets: (id: string) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
	toogleEditModal: (open: boolean) => void
	setEditableBasket: (id: string) => void
	toogleSaveError: (id: string, error: boolean) => void
	selectAllBaskets: () => void
	updateRuntimeError: (id: string) => void
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
									id: generateUniqueId(),
									identifier: maxIdentifier + 1,
								})
							} else {
								void state.storedBaskets.push(basket)
							}
						}
					}
				}),
			setExchange: (exchange) => set({ exchange }),
			updateRuntimeBasketData: (basket: SavedBasketsObject) =>
				set((state) => {
					const index = state.runtimeBasketList.findIndex(
						(b) => b.id === basket.id
					)
					state.runtimeBasketList[index] = basket
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
			setTimeError: (timeError) => set({ timeError }),
			setEmptyBasketError: (emptyBasketError) => set({ emptyBasketError }),
			resetEditablebasket: () =>
				set((state) => void (state.editableBasketData = defaultBasketData)),
			toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
				set({ isAddBasketModalOpen }),
			toogleEditModal: (isEditModalOpen) => set({ isEditModalOpen }),
			toggleTimeErrorModalOpen: (timeErrorModalOpen) =>
				set({ timeErrorModalOpen }),
			toogleSaveError: (id: string, error: boolean) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((basket) =>
						basket.id === id ? { ...basket, error: error } : { ...basket }
					)
				}),

			addNewRuntimeBasket: (newBasket: SavedBasketsObject) =>
				set((state) => {
					void state.runtimeBasketList.push(newBasket)
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

			setDuplicateError: (err: BasketState['duplicateError']) =>
				set((state) => {
					state.duplicateError = err
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

			closeEditConfirmation: (value: boolean) =>
				set((state) => {
					state.closeModalConfirmation = value
				}),
			handleDateChange: (startDate: string, endDate: string) =>
				set((state) => {
					state.startDate = startDate
					state.endDate = endDate
				}),
		}))
	)
)
