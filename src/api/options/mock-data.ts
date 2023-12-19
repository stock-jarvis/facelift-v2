import { range } from 'radash'
import { OptionsApiReponse } from './types'

export const mockOptionsApiResponse: OptionsApiReponse = {
	data: [
		{
			'16-12-2022': [...range(0, 800, (i) => i, 100)].map((value) => ({
				strikePrice: 38000 + value,

				ceLTP: 900 - value,
				ceLTQ: value + 10,
				ceOI: 10 / value + 10,

				peLTP: 100 + value,
				peLTQ: value + 20,
				peOI: 10 / value + 20,
			})),
		},
		{
			'17-12-2022': [...range(0, 800, (i) => i, 100)].map((value) => ({
				strikePrice: 38000 + value,

				ceLTP: 900 - value,
				ceLTQ: value + 10,
				ceOI: 10 / value + 10,

				peLTP: 100 + value,
				peLTQ: value + 20,
				peOI: 10 / value + 20,
			})),
		},
	],
}
