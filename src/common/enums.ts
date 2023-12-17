export enum DerivativesMetric {
	Delta = 'Delta',
	OpenInterest = 'OI',
	ImpliedVolatility = 'IV',
}

export enum TradeAction {
	Buy = 'B',
	Sell = 'S',
}

export enum Exchange {
	NSE = 'NSE',
	MCX = 'MCX',
	CUR = 'CUR',
}

export enum Outcome {
	Loss = 'Loss',
	Profit = 'Profit',
	NoChange = 'NoChange',
}

export enum OptionType {
	PUT = 'PE',
	CALL = 'CE',
}

export enum TriggerPointMetric {
	Price = 'Price',
	Points = 'Pt',
	Percentage = '%',
}

export enum ComparisonOperator {
	LessThan = '<',
	GreaterThan = '>',
	LessThanOrEqualTo = '<=',
	GreaterThanorEqualTo = '>=',
}
