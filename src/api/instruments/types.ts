export type GetInstrumentRes = { InstrumentList: Array<string> }

// response is a date in UNIX time format, multiple it by 1000 to get it in milliseconds
export type GetInstrumentTradingDaysRes = { dates: Array<number> }
