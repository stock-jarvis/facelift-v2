import { create } from 'zustand'
import { RunTimeBasketData, SavedBasketsObject } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type BasketState = {
	endDate: string
	startDate: string
	timeError: boolean
	positionCopy: boolean
	duplicateError: boolean
	isEditModalOpen: boolean
	emptyBasketError: boolean
	timeErrorModalOpen: boolean
	isAddBasketModalOpen: boolean
	closeModalConfirmation: boolean

	selectedBaskets: RunTimeBasketData[]
	runtimeBasketList: RunTimeBasketData[]
	editableBasketData: RunTimeBasketData
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
	deleteStoredBasket: (id: string) => void
	addToStoredBaskets: (basket: SavedBasketsObject) => void
	addToSavedBasket: (basket: SavedBasketsObject) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	handleDateChange: (startDate: string, endDate: string) => void
	resetEditablebasket: () => void
	closeEditConfirmation: (value: boolean) => void
	updateRuntimeBasketData: (
		id: string,
		exchange: string,
		instrument: string
	) => void
	addNewRuntimeBasket: (basket: RunTimeBasketData) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
	toogleEditModal: (open: boolean) => void
	setEditableBasket: (id: string) => void
	toogleSaveError: (id: string, error: boolean) => void
	setPositionCopy: (val: boolean) => void
	addToSelectedBaskets: (id: string) => void
	filterSelectedBaskets: (id: string) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [],
	storedBaskets: [
		{
			id: '1',
			name: 'Apple',
			identifier: 1,
			exchange: 'NSE',
			atm: 'spot',
			ticker: 'ticker-1',
			type: 'INTRA',
		},
		{
			id: '2',
			name: 'Apple',
			identifier: 0,
			exchange: 'NSE',
			atm: 'spot',
			ticker: 'ticker-1',
			type: 'INTRA',
		},
	],
	startDate: '',
	endDate: '',
	selectedBaskets: [],
	duplicateError: false,
	isEditModalOpen: false,
	positionCopy: false,

	isAddBasketModalOpen: false,
	timeErrorModalOpen: false,
	closeModalConfirmation: false,
	editableBasketData: {
		id: '',
		name: '',
		exchange: '',
		instrument: '',
		identifier: 0,
		error: false,
	},
	savedBaskets: [],
	timeError: false,
	emptyBasketError: false,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer(
		devtools((set) => ({
			...defaultState,

			addToSelectedBaskets: (id: string) =>
				set((state) => {
					const data = state.runtimeBasketList.find((b) => b.id === id)
					if (data) {
						void state.selectedBaskets.push(data)
					}
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

			updateRuntimeBasketData: (
				id: string,
				exchange: string,
				instrument: string
			) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((b) => {
						if (b.id === id) {
							return { ...b, exchange: exchange, instrument: instrument }
						} else {
							return b
						}
					})
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
			filterSelectedBaskets: (id: string) =>
				set((state) => {
					state.selectedBaskets = state.selectedBaskets.filter(
						(b) => b.id !== id
					)
				}),
			setTimeError: (timeError) => set({ timeError }),
			setEmptyBasketError: (emptyBasketError) => set({ emptyBasketError }),
			resetEditablebasket: () =>
				set(
					(state) =>
						void (state.editableBasketData = {
							id: '',
							identifier: 0,
							name: '',
							instrument: '',
							exchange: '',
							error: false,
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

			addNewRuntimeBasket: (newBasket: RunTimeBasketData) =>
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
					state.editableBasketData = state.runtimeBasketList.find(
						(basket) => basket.id === id
					) || {
						id: '',
						name: '',
						exchange: '',
						instrument: '',
						identifier: 0,
						error: false,
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
