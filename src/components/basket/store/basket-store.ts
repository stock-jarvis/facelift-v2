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
	savedBaskets: RunTimeBasketData[]
	closeModalConfirmation: boolean
	timeError: boolean
	positionCopy: boolean
}

type BasketStateActions = {
	setExchange: (exchange: BasketState['exchange']) => void
	setTimeError: (error: boolean) => void
	setCreateBasketExchange: (exchange: BasketState['exchange']) => void
	toggleSetBasketModalOpen: (
		isAddBasketModalOpen: BasketState['isAddBasketModalOpen']
	) => void

	closeEditConfirmation: (value: boolean) => void
	addNewRuntimeBasket: (basket: RunTimeBasketData) => void
	deleteRuntimeBasket: (id: string) => void
	setDuplicateError: (error: BasketState['duplicateError']) => void
	toogleEditModal: (open: boolean) => void
	setEditableBasket: (id: string) => void
	toogleSaveError: (id: string, error: boolean) => void
	setPositionCopy: (val: boolean) => void
}

const defaultState: BasketState = {
	runtimeBasketList: [],
	duplicateError: false,
	isEditModalOpen: false,
	positionCopy: false,
	exchange: { type: 'NSE', id: 1 },
	createBasketExhange: { type: 'NSE', id: 1 },
	isAddBasketModalOpen: false,
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
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer((set) => ({
		...defaultState,
		setTimeError: (timeError) => set({ timeError }),
		setPositionCopy: (positionCopy) => set({ positionCopy }),
		toggleSetBasketModalOpen: (isAddBasketModalOpen) =>
			set({ isAddBasketModalOpen }),
		toogleEditModal: (isEditModalOpen) => set({ isEditModalOpen }),

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
	}))
)
