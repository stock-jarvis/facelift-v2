import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import dayjs, { Dayjs } from 'dayjs'

import { Exchange } from 'common/enums'
import {
	BANK_NIFTY_TICKER,
	timeBoundariesByExchange,
} from 'src/common/constants'

type SimulatorParams = {
	time: Dayjs
	date: Dayjs
	exchange: Exchange
	// TODO: Default active instrument in other Exchanges
	activeInstrument: string
	selectedInstruments: string[]
}

type SimulatorParamsActions = {
	setTime: (time: SimulatorParams['time']) => void

	setDate: (date: SimulatorParams['date']) => void

	setExchange: (exchange: SimulatorParams['exchange']) => void

	setActiveInstrument: (
		activeInstrument: SimulatorParams['activeInstrument']
	) => void
	addSelectedInstrument: (
		instrument: SimulatorParams['selectedInstruments'][number]
	) => void
	setSelectedInstruments: (
		selectedInstruments: SimulatorParams['selectedInstruments']
	) => void
	removeSelectedInstrument: (
		instrumentToRemove: SimulatorParams['selectedInstruments'][number]
	) => void
}

const exchangeStartTime = timeBoundariesByExchange[Exchange.NSE].start

const defaultState: SimulatorParams = {
	time: dayjs(
		`${exchangeStartTime.hour}-${exchangeStartTime.minute}-${exchangeStartTime.second}`,
		'hh-mm-ss'
	),
	date: dayjs('06-01-2021', 'DD-MM-YYYY'),
	exchange: Exchange.NSE,
	activeInstrument: BANK_NIFTY_TICKER,
	selectedInstruments: [BANK_NIFTY_TICKER],
}

export const useSimulatorParamsStore = create<
	SimulatorParams & SimulatorParamsActions
>()(
	immer((set) => ({
		...defaultState,

		setTime: (time) => set({ time }),

		setDate: (date) => set({ date }),

		setExchange: (exchange) => set({ exchange }),

		setActiveInstrument: (activeInstrument) => set({ activeInstrument }),

		/** Selected instrument actions */
		addSelectedInstrument: (instrument) =>
			set((state) => {
				state.selectedInstruments.push(instrument)
			}),
		setSelectedInstruments: (selectedInstruments) =>
			set({ selectedInstruments }),
		removeSelectedInstrument: (instrumentToRemove) =>
			set((state) => {
				const updatedSelectedInstruments = state.selectedInstruments.filter(
					(instrument) => instrumentToRemove !== instrument
				)
				state.selectedInstruments = updatedSelectedInstruments
				/** When an instrument is deleted, The tab before it should be selected */
				state.activeInstrument =
					updatedSelectedInstruments[updatedSelectedInstruments.length - 1]
			}),
	}))
)
