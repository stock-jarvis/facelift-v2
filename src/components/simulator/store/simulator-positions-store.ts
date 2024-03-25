import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Position } from '../types'
import { Dayjs } from 'dayjs'

interface SimulatorPosition {
	positions: Position[]
}

type SimulatorPositionsActions = {
	addPosition: (position: Omit<Position, 'id'>) => void
	exitPosition: (positionId: string, date: Dayjs, time: Dayjs) => void
	removePosition: (positionId: string) => void
	editPosition: (positionId: string, position: Partial<Position>) => void
}

const defaultState: SimulatorPosition = {
	positions: [],
}

export const useSimulatorPositionsStore = create<
	SimulatorPosition & SimulatorPositionsActions
>()(
	immer((set) => ({
		...defaultState,

		addPosition: (position) =>
			set((state) => {
				state.positions.push({ ...position, id: crypto.randomUUID() })
			}),

		exitPosition: (positionId, date, time) =>
			set((state) => {
				const index = state.positions.findIndex((pos) => pos.id === positionId)
				state.positions[index].exited = true
				state.positions[index].exitDate = date
				state.positions[index].exitTime = time
			}),

		removePosition: (positionId) =>
			set((state) => {
				state.positions = state.positions.filter(
					(position) => position.id !== positionId
				)
			}),

		editPosition: (positionId, position) =>
			set((state) => {
				const index = state.positions.findIndex((pos) => pos.id === positionId)
				const curr_pos = state.positions[index]

				state.positions[index] = { ...curr_pos, ...position }
			}),
	}))
)
