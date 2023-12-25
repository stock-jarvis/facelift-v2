import { OHLC } from 'src/common/types'
import { create } from 'zustand'

type ChartData = {
	ohlcData: OHLC[]
}

type ChartDataActions = {
	replaceOHLCData: (ohlcData: OHLC[]) => void
}

const defaultState: ChartData = {
	ohlcData: [],
}

export const useChartDataStore = create<ChartData & ChartDataActions>(
	(set) => ({
		...defaultState,
		replaceOHLCData: (ohlcData) => set({ ohlcData }),
	})
)
