import { create } from 'zustand'
import { ExchangeType, RunTimeBasketData } from '../types/types'
import { immer } from 'zustand/middleware/immer'
type BasketState = {
	exchange: ExchangeType
	createBasketExhange: ExchangeType
	isAddBasketModalOpen: boolean
	runtimeBasketList: RunTimeBasketData[]
	duplicateError: boolean
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
	setCreateBasketExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
	addNewRuntimeBasket: (basket: RunTimeBasketData) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [],
	duplicateError: false,
	exchange: { type: 'NSE', id: 1 },
	createBasketExhange: { type: 'NSE', id: 1 },
	isAddBasketModalOpen: false,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer((set) => ({
		...defaultState,

		toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
			set({ isAddBasketModalOpen }),
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

		setDuplicateError: (err: BasketState['duplicateError']) =>
			set((state) => {
				state.duplicateError = err
			}),
	}))
)
