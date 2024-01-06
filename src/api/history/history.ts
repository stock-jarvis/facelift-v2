import { Resolution } from 'src/common/enums'

export const getSymbolHistory = async (
	instrument: string,
	resolution: Resolution,
	from: number,
	to: number
) => {
	// Dev
	console.log(instrument, resolution, from, to)

	const response = await fetch(
		'https://demo-live-data.highcharts.com/aapl-c.json'
	)

	return response.json()
}
