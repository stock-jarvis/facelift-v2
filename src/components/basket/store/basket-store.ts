import { create } from 'zustand'
import { SavedBasketsObject } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type BasketState = {
	endDate: string
	exchange: string
	startDate: string
	timeError: boolean
	positionCopy: boolean
	duplicateError: boolean
	isEditModalOpen: boolean
	emptyBasketError: boolean
	timeErrorModalOpen: boolean
	isAddBasketModalOpen: boolean
	closeModalConfirmation: boolean
	//selectedBaskets: SavedBasketsObject[] & { seleceted: boolean }
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
	deleteStoredBasket: (id: string) => void
	addToStoredBaskets: (basket: SavedBasketsObject) => void
	addToSavedBasket: (basket: SavedBasketsObject) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	handleDateChange: (startDate: string, endDate: string) => void
	resetEditablebasket: () => void
	closeEditConfirmation: (value: boolean) => void
	updateRuntimeBasketData: (basket: SavedBasketsObject) => void
	addNewRuntimeBasket: (basket: SavedBasketsObject) => void
	//updateSelection: (id: string) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
	toogleEditModal: (open: boolean) => void
	setEditableBasket: (id: string) => void
	toogleSaveError: (id: string, error: boolean) => void
	setPositionCopy: (val: boolean) => void
	updateSelectedBasket: () => void
	//	selectAllBaskets: (value: boolean) => void
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
		},
	],
	storedBaskets: [
		{
			id: '1',
			key: '1',
			name: 'Apple',
			identifier: 1,
			exchange: 'NSE',
			atm: 'spot',
			ticker: 'ticker-1',
			type: 'INTRA',
		},
		{
			id: '2',
			key: '2',
			name: 'Apple',
			identifier: 0,
			exchange: 'NSE',
			atm: 'spot',
			ticker: 'ticker-1',
			type: 'INTRA',
		},
	],
	exchange: 'NSE',
	startDate: '',
	endDate: '',
	//selectedBaskets: [],
	duplicateError: false,
	isEditModalOpen: false,
	positionCopy: false,
	isAddBasketModalOpen: false,
	timeErrorModalOpen: false,
	closeModalConfirmation: false,
	editableBasketData: {
		id: '',
		key: '',
		name: '',
		exchange: '',
		ticker: '',
		identifier: 0,
		type: 'INTRA',
		atm: 'spot',
	},
	savedBaskets: [],
	timeError: false,
	emptyBasketError: false,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer(
		devtools((set) => ({
			...defaultState,
			updateSelectedBasket: () =>
				set(() => {
					// state.selectedBaskets = state.runtimeBasketList.filter(
					// 	(b) => b.selected === true
					// )
				}),
			addToStoredBaskets: (basket: SavedBasketsObject) =>
				set((state) => {
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
				}),

			// selectAllBaskets: (value: boolean) =>
			// 	set(() => {
			// 		// void (state.runtimeBasketList = state.runtimeBasketList.map(
			// 		// 	(basket) => {
			// 		// 		return {
			// 		// 			...basket,
			// 		// 			selected: value,
			// 		// 		}
			// 		// 	}
			// 		// ))
			// 		// if (value) {
			// 		// 	state.selectedBaskets = state.runtimeBasketList.map(
			// 		// 		(basket) => basket
			// 		// 	)
			// 		// } else {
			// 		// 	state.selectedBaskets = []
			// 		// }
			// 	}),
			setExchange: (exchange) => set({ exchange }),
			updateRuntimeBasketData: (basket: SavedBasketsObject) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((b) => {
						if (b.id === basket.id) {
							return basket
						} else {
							return b
						}
					})
				}),
			// updateSelection: (id: string) =>
			// 	set((state) => {
			// 		state.runtimeBasketList = state.runtimeBasketList.map((b) => {
			// 			if (b.id === id) {
			// 				return { ...b, selected: !b.selected }
			// 			} else {
			// 				return b
			// 			}
			// 		})
			// 	}),
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

			setTimeError: (timeError) => set({ timeError }),
			setEmptyBasketError: (emptyBasketError) => set({ emptyBasketError }),
			resetEditablebasket: () =>
				set(
					(state) =>
						void (state.editableBasketData = {
							key: '',
							id: '',
							identifier: 0,
							name: '',
							ticker: '',
							exchange: '',
							type: '',
							atm: '',
						})
				),
			setPositionCopy: (positionCopy) => set({ positionCopy }),
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
					state.duplicateError = false
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
