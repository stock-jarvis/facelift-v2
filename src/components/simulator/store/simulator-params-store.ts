import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import dayjs, { Dayjs } from 'dayjs'

import { Exchange } from '../../../common/enums'
import { BANK_NIFTY_TICKER } from 'src/common/constants'

type SimulatorParams = {
	time: Dayjs
	date: Dayjs
	exchange: Exchange
	// TODO: Default active instrument in other Exchanges
	activeInstrument: string
	selectedInstruments: string[]
	selectedInstrumentMetadata: Record<
		string,
		{ selectedExpiry: number | undefined }
	>
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

	setActiveInstrumentMetadata: (
		metadata: SimulatorParams['selectedInstrumentMetadata'][string]
	) => void
	activeInstrumentMetadata: () => SimulatorParams['selectedInstrumentMetadata'][string]
}

const defaultState: SimulatorParams = {
	time: dayjs().startOf('day'),
	date: dayjs(),
	exchange: Exchange.NSE,
	activeInstrument: BANK_NIFTY_TICKER,
	selectedInstruments: [BANK_NIFTY_TICKER],
	selectedInstrumentMetadata: {
		BANK_NIFTY_TICKER: { selectedExpiry: undefined },
	},
}

export const useSimulatorParamsStore = create<
	SimulatorParams & SimulatorParamsActions
>()(
	immer((set, get) => ({
		...defaultState,

		activeInstrumentMetadata: () =>
			get().selectedInstrumentMetadata?.[get().activeInstrument],

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
				state.selectedInstruments = state.selectedInstruments.filter(
					(instrument) => instrumentToRemove !== instrument
				)

				// Remove metadata attached to instrument
				delete state.selectedInstrumentMetadata[instrumentToRemove]
			}),

		setActiveInstrumentMetadata: (metadata) => {
			set((state) => {
				const activeInstrument = state.activeInstrument
				state.selectedInstrumentMetadata[activeInstrument] = {
					...state.selectedInstrumentMetadata[activeInstrument],
					...metadata,
				}
			})
		},
	}))
)
