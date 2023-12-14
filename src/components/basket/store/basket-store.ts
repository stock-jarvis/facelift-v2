import { create } from 'zustand'
import { ExchangeType } from '../types/types'
type BasketState = {
	exchange: ExchangeType
	isAddBasketModalOpen: boolean
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void
}

const defaultState: BasketState = {
	exchange: { type: 'NSE', id: 1 },
	isAddBasketModalOpen: false,
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	(set) => ({
		...defaultState,
		toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
			set({ isAddBasketModalOpen }),
		setExchange: (exchange) => set({ exchange }),
	})
)
