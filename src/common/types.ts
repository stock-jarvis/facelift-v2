import { OptionType, TriggerPointMetric } from './enums'

export type Option = {
	type: OptionType
	strikePrice: number
}

export type TriggerPoint = {
	value: number
	metric: TriggerPointMetric
}
