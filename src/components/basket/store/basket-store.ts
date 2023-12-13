import { create } from 'zustand'
import { ExchangeType } from '../types/types'
type BasketState = {
	exchange: ExchangeType
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
}

const defaultState: BasketState = {
	exchange: { type: 'NSE', id: 1 },
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	(set) => ({
		...defaultState,
		setExchange: (exchange) => set({ exchange }),
	})
)
