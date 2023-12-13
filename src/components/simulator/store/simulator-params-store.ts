import { create } from 'zustand'
import dayjs, { Dayjs } from 'dayjs'

import { BANK_NIFTY_TICKER } from '../constants'
import { Exchange } from '../types'

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
	setSelectedInstruments: (
		selectedInstruments: SimulatorParams['selectedInstruments']
	) => void
}

const defaultState: SimulatorParams = {
	// TODO: Change this
	time: dayjs().startOf('day'),
	// TODO: Change this
	date: dayjs(),
	exchange: 'NSE',
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
	setSelectedInstruments: (selectedInstruments) => set({ selectedInstruments }),
}))
