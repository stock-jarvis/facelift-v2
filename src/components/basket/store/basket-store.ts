import { companyData } from './../../home/constants/data'
import { create } from 'zustand'
import { SavedBasket, EditType } from '../types/types'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { defaultBasketData } from '../constants/data'
import { Exchange } from 'src/common/enums'
import dayjs, { Dayjs } from 'dayjs'
import { GetSpecificBasketAPI } from '../../../api/AuthService'
import { base64ToJSON } from '../utils/BaseToJSON'
import { convertData } from '../utils/revertData'

type BasketState = {
	endDate: Dayjs
	startDate: Dayjs
	exchange: Exchange
	editType: EditType
	timeError: boolean
	runtimeDuplicate: boolean
	savedBasket: SavedBasket[]
	selectedBaskets: SavedBasket[]
	editableBasketData: SavedBasket
	runtimeBasketList: SavedBasket[]
	basketData: SavedBasket[]
	newState: []
}

type BasketStateActions = {
	selectAllBaskets: () => void
	resetEditablebasket: () => void
	clearSelectedBaskets: () => void
	setExchange: (exchange: Exchange) => void
	setRuntimeError: (id: string) => void
	setTimeError: (error: boolean) => void
	deleteStoredBasket: (id: string) => void
	addToSavedBasket: (id: string) => void
	updateRuntimeError: (id: string) => void
	deleteRuntimeBasket: (id: string) => void
	removeSelectedBasket: (id: string) => void
	moveStoredToRuntimeBasket: (id: string) => void
	addBasketToSelectedBaskets: (id: string) => void
	closeDuplicateConfirmModal: (value: boolean) => void
	setEditableBasket: (id: string, type: EditType) => void
	toogleSaveError: (id: string, error: boolean) => void
	addNewRuntimeBasket: (basket: SavedBasket) => void
	updateRuntimeBasketData: (basket: SavedBasket) => void
	handleDateChange: (startDate: Dayjs, endDate: Dayjs) => void
	createDuplicateStoredBasket: (basket: SavedBasket) => void
	setBasketData: (data: SavedBasket[]) => void
	setNewState: (data: SavedBasket[]) => void
}

const defaultState: BasketState = {
	savedBasket: [],
	timeError: false,
	endDate: dayjs(''),
	selectedBaskets: [],
	startDate: dayjs(''),
	runtimeBasketList: [],
	exchange: Exchange.NSE,
	editType: EditType.NILL,
	runtimeDuplicate: false,
	editableBasketData: defaultBasketData,
	basketData: [],
	newState: [],
}

export const useBasketStore = create<BasketState & BasketStateActions>()(
	immer(
		devtools((set) => ({
			...defaultState,
			setNewState: (value) =>
				set((state) => {
					state.savedBasket = value.map((v, id) => ({
						...v,
						id: id.toString(),
					}))
				}),

			setExchange: (exchange) => set({ exchange }),

			setTimeError: (timeError) => set({ timeError }),

			closeDuplicateConfirmModal: (runtimeDuplicate) =>
				set({ runtimeDuplicate }),

			clearSelectedBaskets: () =>
				set((state) => {
					state.selectedBaskets = []
				}),

			resetEditablebasket: () =>
				set((state) => {
					state.editType = EditType.NILL
					void (state.editableBasketData = defaultBasketData)
				}),

			handleDateChange: (startDate: Dayjs, endDate: Dayjs) =>
				set((state) => {
					state.startDate = dayjs(startDate)
					state.endDate = dayjs(endDate)
				}),

			updateRuntimeBasketData: (basket: SavedBasket) =>
				set((state) => {
					if (state.editType === 'runtime') {
						const index = state.runtimeBasketList.findIndex(
							(b) => b.id === basket.id
						)
						state.runtimeBasketList[index] = basket
					} else {
						const index = state.savedBasket.findIndex((b) => b.id === basket.id)
						state.savedBasket[index] = basket
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

			addNewRuntimeBasket: (newBasket: SavedBasket) =>
				set((state) => {
					void state.runtimeBasketList.push(newBasket)
				}),
			removeSelectedBasket: (id) =>
				set((state) => {
					const basket = state.selectedBaskets.find((b) => b.id === id)
					if (basket) {
						state.selectedBaskets = state.selectedBaskets.filter(
							(b) => b.id !== basket.id
						)
					}
				}),
			addBasketToSelectedBaskets: (id) =>
				set((state) => {
					const basket = state.savedBasket[+id]
					console.log({ basket })
					if (basket) {
						const data = state.selectedBaskets.find((b) => b.id === id)
						if (!data) {
							state.selectedBaskets.push(basket)
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

			toogleSaveError: (id: string, error: boolean) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.map((basket) =>
						basket.id === id ? { ...basket, error: error } : { ...basket }
					)
				}),

			deleteStoredBasket: (id: string) =>
				set((state) => {
					state.savedBasket = state.savedBasket.filter((basket) => {
						return basket.id !== id
					})
				}),

			deleteRuntimeBasket: (id: string) =>
				set((state) => {
					state.runtimeBasketList = state.runtimeBasketList.filter((basket) => {
						return basket.id !== id
					})
				}),

			// setEditableBasket: (id: string, type: EditType) =>
			// 	set((state) => {
			// 		console.log(id)
			// 		state.editType = type
			// 		const dataToBeExtracted =
			// 			type === EditType.RUNTIME
			// 				? state.runtimeBasketList
			// 				: state.savedBasket

			// 		const data = dataToBeExtracted.find((basket) => basket.name === id)
			// 		if (data) {
			// 			state.editableBasketData = data
			// 		}
			// 	}),
			setEditableBasket: async (id: string, type: EditType) => {
				try {
					const response = await GetSpecificBasketAPI(id)
					if (response == 2) {
						set((state) => {
							console.log(id)
							state.editType = type
							const dataToBeExtracted =
								type === EditType.RUNTIME
									? state.runtimeBasketList
									: state.savedBasket

							const data = dataToBeExtracted.find(
								(basket) => basket.name === id
							)
							console.log({ data })
							if (data) {
								data.id = data.name
								console.log({ data })
								state.editableBasketData = data
							}
						})
					} else {
						// Assuming response contains the data you need to set in editableBasketData
						set((state) => {
							state.editType = type
							const JSON = base64ToJSON(response.ipjson)
							console.log(JSON)
							const revertedData = convertData(JSON, response.Details)
							console.log(revertedData)
							if (response) {
								state.editableBasketData = revertedData
							}
						})
					}
				} catch (error) {
					console.error('Error fetching specific basket:', error)
				}
			},
			addToSavedBasket: (id: string) =>
				set((state) => {
					const basket = state.runtimeBasketList.find((b) => b.id === id)
					if (basket) {
						const checkIfExists = state.savedBasket.find(
							(b) => b.id === basket.id
						)

						if (checkIfExists) {
							state.savedBasket = state.savedBasket.map((b) => {
								if (b.id === basket.id) {
									return { ...basket, identifier: b.identifier }
								} else {
									return b
								}
							})
						} else {
							const checkNames = state.savedBasket.filter(
								(b) => b.name === basket.name
							)

							if (checkNames && checkNames.length > 0) {
								const maxIdentifier = Math.max(
									...checkNames.map((b) => b.identifier)
								)

								void state.savedBasket.push({
									...basket,
									identifier: maxIdentifier + 1,
								})
							} else {
								void state.savedBasket.push(basket)
							}
						}
					}
				}),

			createDuplicateStoredBasket: (basket: SavedBasket) =>
				set((state) => {
					void state.savedBasket.push(basket)
				}),

			moveStoredToRuntimeBasket: (id: string) =>
				set((state) => {
					const checkIfExists = state.runtimeBasketList.find((b) => b.id === id)
					if (!checkIfExists) {
						const basket = state.savedBasket.find((b) => b.id === id)
						if (basket) {
							const newBasket = state.runtimeBasketList.filter(
								(b) => b.name === basket.name
							)
							if (!newBasket) {
								void state.runtimeBasketList.push(basket)
							} else {
								void state.runtimeBasketList.push({
									...basket,
									identifier: newBasket[newBasket.length - 1].identifier + 1,
								})
							}
						}
					} else {
						state.runtimeDuplicate = true
					}
				}),
			// Inside useBasketStore
			setBasketData: (data) =>
				set((state) => {
					state.savedBasket = data
				}),
		}))
	)
	//update state
)
