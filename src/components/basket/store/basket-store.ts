import { create } from 'zustand'
import {
	ExchangeType,
	RunTimeBasketData,
	SavedBasketsObject,
} from '../types/types'
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
	createBasketExhange: ExchangeType
	exchange: ExchangeType
	savedBaskets: SavedBasketsObject[]
	selectedBaskets: RunTimeBasketData[]
	runtimeBasketList: RunTimeBasketData[]
	editableBasketData: RunTimeBasketData
}

type BasketStateActions = {
	setTimeError: (error: boolean) => void
	setEmptyBasketError: (error: boolean) => void
	setExchange: (exchange: BasketState['exchange']) => void
	setCreateBasketExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
	addToSavedBasket: (basket: SavedBasketsObject) => void
	toggleTimeErrorModalOpen: (timeErrorModalOpen: boolean) => void
	handleDateChange: (startDate: string, endDate: string) => void
	resetEditablebasket: () => void
	closeEditConfirmation: (value: boolean) => void
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
	startDate: '',
	endDate: '',
	selectedBaskets: [],
	duplicateError: false,
	isEditModalOpen: false,
	positionCopy: false,
	exchange: { type: 'NSE', id: 1 },
	createBasketExhange: { type: 'NSE', id: 1 },
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
	savedBaskets: [
		{
			id: '1',
			exchange: 'NSE',
			ticker: 'Ticker 1',
			type: 'INTRA',
			atm: 'Spot',
		},
		{
			id: '2',
			exchange: 'CUR',
			ticker: 'Ticker 1',
			type: 'INTRA',
			atm: 'Spot',
		},
		{
			id: '1',
			exchange: 'MCX',
			ticker: 'Ticker 1',
			type: 'INTRA',
			atm: 'Spot',
		},
	],
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

			setExchange: (exchange) => set({ exchange }),

			setCreateBasketExchange: (exchange) => set({ exchange }),

			addNewRuntimeBasket: (newBasket: RunTimeBasketData) =>
				set((state) => {
					void state.runtimeBasketList.push(newBasket)
					state.duplicateError = false
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
