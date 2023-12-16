import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'

import { BANK_NIFTY_TICKER } from '../constants'
import { Exchange } from '../enums'

type SimulatorParams = {
	time: Dayjs
	date: Dayjs
	exchange: Exchange
	activeInstrument?: string
	selectedInstruments: string[]
}

type SimulatorParamsActions = {
	setTime: (time: SimulatorParams['time']) => void
	setDate: (date: SimulatorParams['date']) => void
	setExchange: (exchange: SimulatorParams['exchange']) => void
	setActiveInstrument: (
		activeInstrument: SimulatorParams['activeInstrument']
	) => void
	setSelectedInstruments: (
		selectedInstruments: SimulatorParams['selectedInstruments']
	) => void
}

const defaultState: SimulatorParams = {
	time: dayjs().startOf('day'),
	date: dayjs(),
	exchange: Exchange.NSE,
	activeInstrument: BANK_NIFTY_TICKER,
	selectedInstruments: [BANK_NIFTY_TICKER],
}

export const useSimulatorParamsStore = create<
	SimulatorParams & SimulatorParamsActions
>()((set) => ({
	...defaultState,
	setTime: (time) => set({ time }),
	setDate: (date) => set({ date }),
	setExchange: (exchange) => set({ exchange }),
	setActiveInstrument: (activeInstrument) => set({ activeInstrument }),
	setSelectedInstruments: (selectedInstruments) => set({ selectedInstruments }),
}))
