import { HighchartsOscillatorType, HighchartsOverlayType } from './types'

export const PRIMARY_CHART_ID = 'system-trade-primary-chart'

export const OverlayIndicators: Record<string, HighchartsOverlayType> = {
	'Acceleration Bands': 'abands',
	'Bollinger Bands': 'bb',
	DEMA: 'dema',
}

export const OscillatorIndicators: Record<string, HighchartsOscillatorType> = {
	'Absolute Price Oscillator': 'apo',
	Aroon: 'aroon',
	'Aroon Oscillator': 'aroonoscillator',
}
