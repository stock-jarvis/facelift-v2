import { useMemo } from 'react'

import Highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

import { OHLC } from 'src/common/types'
import { PRIMARY_CHART_ID } from '../constants'
import { Flex } from 'antd'

import './styles/styles.css'

type ChartProps = {
	ohlcData: OHLC[]
}

const Chart: React.FC<ChartProps> = ({ ohlcData }) => {
	const chartOptions: Highstock.Options = useMemo(() => {
		const chartOptionsBuilder: Highstock.Options = {
			plotOptions: {
				candlestick: {
					color: 'pink',
					lineColor: 'red',
					upColor: 'lightgreen',
					upLineColor: 'green',
				},
			},
			rangeSelector: {
				enabled: false,
			},

			exporting: {
				enabled: false,
			},

			navigator: {
				enabled: false,
			},

			// xAxis: {
			//   events: {
			//     afterSetExtremes: (event) => {
			//       /** Condition specifies the event of scrolling and reaching the left end of the chart*/
			//       if (event.dataMin === event.min) {
			//         loadMoreOhlcData();
			//       }
			//     },
			//   },
			// },

			// yAxis: yAxisOptions,

			series: [
				{
					id: PRIMARY_CHART_ID,
					type: 'candlestick',
					// name: instrument.value,
					data: ohlcData,
				},
				// ...overlays,
				// ...oscillators,
			],
		}

		chartOptionsBuilder.series = chartOptionsBuilder.series?.filter(
			(series) => {
				const seriesYAxis = series.yAxis as number
				const chartYAxis = chartOptionsBuilder.yAxis as
					| Highstock.YAxisOptions[]
					| undefined
				if (seriesYAxis) {
					if (!chartYAxis?.[seriesYAxis]) {
						return false
					}
				}
				return true
			}
		)

		return chartOptionsBuilder
	}, [ohlcData]) //[instrument.value, ohlcData, overlays, oscillators, yAxisOptions]);

	return (
		<Flex className="w-full h-full">
			<div className="chart-container">
				<HighchartsReact
					// ref={chartRef}
					highcharts={Highstock}
					options={chartOptions}
					constructorType={'stockChart'}
				/>
			</div>
		</Flex>
	)
}

export default Chart
