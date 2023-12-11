import { create } from 'zustand'

import { BANK_NIFTY_TICKER } from '../constants'
import { Exchange } from '../types'

type SimulatorParams = {
	time: string
	date: string
	exchange: Exchange
	activeInstrument?: string
	selectedInstruments: string[]
}

type SimulatorParamsActions = {
	setTime: (time: SimulatorParams['time']) => void
	setExchange: (exchange: SimulatorParams['exchange']) => void
	setSelectedInstruments: (
		selectedInstruments: SimulatorParams['selectedInstruments']
	) => void
}

const defaultState: SimulatorParams = {
	// TODO: Change this
	time: '00:00:00',
	// TODO: Change this
	date: '11/12/2023',
	exchange: 'NSE',
	activeInstrument: BANK_NIFTY_TICKER,
	selectedInstruments: [BANK_NIFTY_TICKER],
}

export const useSimulatorParamsStore = create<
	SimulatorParams & SimulatorParamsActions
>()((set) => ({
	...defaultState,
	setTime: (time) => set({ time }),
	setExchange: (exchange) => set({ exchange }),
	setSelectedInstruments: (selectedInstruments) => set({ selectedInstruments }),
}))
