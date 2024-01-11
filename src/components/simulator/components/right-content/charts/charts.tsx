import { useEffect } from 'react'
import Chart from './chart'
import { useChartDataStore } from './store/chart-data-store'
import { mockOhlcdata } from './mock-data'

const Charts = () => {
	// const { activeInstrument, date, time } = useSimulatorParamsStore()
	const { ohlcData, replaceOHLCData } = useChartDataStore()

	const loadSymbolHistory = async () => {
		// const symbolHistory = await getSymbolHistory(
		// 	activeInstrument,
		// 	Resolution[resolution],
		// 	combineDateTime(date, time).millisecond(),
		// 	combineDateTime(date, time).millisecond()
		// )

		replaceOHLCData(mockOhlcdata)
	}

	useEffect(() => {
		loadSymbolHistory()
	}, [])

	return <Chart ohlcData={ohlcData} />
}

export default Charts
