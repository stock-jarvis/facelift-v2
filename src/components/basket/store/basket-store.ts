import { create } from 'zustand'
import { ExchangeType, RunTimeBasketData } from '../types/types'
import { immer } from 'zustand/middleware/immer'
type BasketState = {
	exchange: ExchangeType
	createBasketExhange: ExchangeType
	isAddBasketModalOpen: boolean
	isEditModalOpen: boolean
	runtimeBasketList: RunTimeBasketData[]
	duplicateError: boolean
	editableBasketData: RunTimeBasketData
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
	setCreateBasketExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
	addNewRuntimeBasket: (basket: RunTimeBasketData) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
	toogleEditModal: (open: boolean) => void
	setEditableBasket: (id: string) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [],
	duplicateError: false,
	isEditModalOpen: false,
	exchange: { type: 'NSE', id: 1 },
	createBasketExhange: { type: 'NSE', id: 1 },
	isAddBasketModalOpen: false,
	editableBasketData: { id: '', name: '', exchange: '', instrument: '' },
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer((set) => ({
		...defaultState,

		toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
			set({ isAddBasketModalOpen }),
		toogleEditModal: (isEditModalOpen) => set({ isEditModalOpen }),

		setExchange: (exchange) => set({ exchange }),

		setCreateBasketExchange: (exchange) => set({ exchange }),

		addNewRuntimeBasket: (newBasket: RunTimeBasketData) =>
			set((state) => {
				const checkIfExists = state.runtimeBasketList.find(
					(basket) => basket.name === newBasket.name
				)
				if (!checkIfExists) {
					void state.runtimeBasketList.push(newBasket)
					state.duplicateError = false
				} else {
					state.duplicateError = true
				}
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
				) || { id: '', name: '', exchange: '', instrument: '' }
			}),
	}))
)
