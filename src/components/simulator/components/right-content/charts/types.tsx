import { SeriesOptionsRegistry } from 'highcharts/highstock'

type HighchartsSeriesOptionsType<
	T extends keyof SeriesOptionsRegistry = keyof SeriesOptionsRegistry,
> = SeriesOptionsRegistry[T]['type']

export type HighchartsIndicatorType = HighchartsSeriesOptionsType

export type HighchartsOscillatorType = HighchartsSeriesOptionsType<
	'SeriesApoOptions' | 'SeriesAroonOptions' | 'SeriesAroonoscillatorOptions'
>

export type HighchartsOverlayType = HighchartsSeriesOptionsType<
	'SeriesAbandsOptions' | 'SeriesBbOptions' | 'SeriesDemaOptions'
>
