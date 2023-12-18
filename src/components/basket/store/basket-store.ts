import { create } from 'zustand'
import { ExchangeType, RunTimeBasketData } from '../types/types'
import { immer } from 'zustand/middleware/immer'
type BasketState = {
	exchange: ExchangeType
	createBasketExhange: ExchangeType
	isAddBasketModalOpen: boolean
	runtimeBasketList: RunTimeBasketData[]
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
	setCreateBasketExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
	addNewRuntimeBasket: (basket: RunTimeBasketData) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [],
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
			set((state) => void state.runtimeBasketList.push(newBasket)),
	}))
)
