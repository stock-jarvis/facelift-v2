const SIMULATOR_BASE_URL = '/simulator/'

export const SimulatorUrl = new Proxy(
	{
		// TODO: Get fullform
		AIOC: 'AIOC',
		GetInstrumentsList: 'GIL',
		GetSpot: 'GetSpot',
	},
	{
		// @ts-expect-error property has type any
		get: (target, property) => `${SIMULATOR_BASE_URL}${target[property]}`,
	}
)
