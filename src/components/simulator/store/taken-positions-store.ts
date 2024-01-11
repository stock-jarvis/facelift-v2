import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

import { TakenPosition } from 'src/common/types'

type TakenPositionsStore = {
	takenPositions: TakenPosition[]
}

type TakenPositionsStoreActions = {
	addTakenPosition: (position: TakenPosition) => void
	removeTakenPosition: (positionId: string) => void
}

const defaultState: TakenPositionsStore = {
	takenPositions: [],
}

export const useTakenPositionsStore = create<
	TakenPositionsStore & TakenPositionsStoreActions
>()(
	immer((set) => ({
		...defaultState,
		addTakenPosition: (position) =>
			set((state) => {
				state.takenPositions.push(position)
			}),
		removeTakenPosition: (positionId) =>
			set((state) => ({
				takenPositions: state.takenPositions.filter(
					(position) => position.id !== positionId
				),
			})),
	}))
)
