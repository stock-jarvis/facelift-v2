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

export enum Resolution {
	'1 Minute' = '1',
	'3 Minute' = '3',
	'5 Minute' = '5',
	'10 Minute' = '10',
	'15 Minute' = '15',
	'30 Minute' = '30',
	'1 Hour' = '60',
	'1 Day' = '1D',
}

export enum OptionContractType {
	// Put Option
	PE = 'PE',
	// Call Option
	CE = 'CE',
	// Future Option
	FUT = 'FUT',
	// Spot option
	SPOT = 'SPOT',
}

export enum BasketType {
	// INTRADAY BASKET
	INTRADAY = 'INTRA',
	// POSITIONAL BASKET
	POSITIONAL = 'POS',
}

export enum BasketAtm {
	SPOT = 'spot',
	FUTURE = 'future',
}

export enum BasketExitType {
	// SQUARE OF ONE LEG
	SQOL = 'SQOL',
	// SQUARE OF ALL LEGS
	SQAL = 'SQAL',
}

export enum BasketLegType {
	SPOT = 'spot',
	FUTURE = 'future',
	OPTIONS = 'options',
}
