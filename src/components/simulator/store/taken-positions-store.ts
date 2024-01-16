import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'
import { unique } from 'radash'

import { TakenPosition } from 'src/common/types'

type TakenPositionsStore = {
	takenPositions: TakenPosition[]
	/** Expiries that need fetching data */
	activeExpiries: string[]
}

type TakenPositionsStoreActions = {
	addActiveExpiry: (expiry: string) => void
	addTakenPosition: (position: TakenPosition) => void
	removeTakenPosition: (positionId: string) => void
}

const defaultState: TakenPositionsStore = {
	takenPositions: [],
	activeExpiries: [],
}

export const useTakenPositionsStore = create<
	TakenPositionsStore & TakenPositionsStoreActions
>()(
	immer((set) => ({
		...defaultState,

		addActiveExpiry: (expiry) =>
			set((state) => {
				state.activeExpiries = unique([
					...state.takenPositions.map((takenPosition) => takenPosition.expiry),
					expiry,
				])
			}),

		addTakenPosition: (position) =>
			set((state) => {
				state.takenPositions.push(position)
				/** Add to active expiries when a position is added. */
				state.activeExpiries = unique([
					...state.activeExpiries,
					position.expiry,
				])
			}),

		removeTakenPosition: (positionId) =>
			set((state) => {
				const updatedTakenPositions = state.takenPositions.filter(
					(position) => position.id !== positionId
				)

				state.takenPositions = updatedTakenPositions
				/** Refreshing active expiries when a position is removed */
				state.activeExpiries = unique(
					updatedTakenPositions.map((takenPosition) => takenPosition.expiry)
				)
			}),
	}))
)
