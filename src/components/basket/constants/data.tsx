import {
	BasketAtm,
	BasketType,
	Exchange,
	OptionType,
	TradeAction,
	BasketExitType,
} from 'src/common/enums'
import {
	SavedPosition,
	SavedBasket,
	RepeatType,
	PositionExitCondition,
	YeildType,
} from '../types/types'
import { DefaultOptionType } from 'antd/es/select'

export const futureExpiry: DefaultOptionType[] = [
	{
		id: 1,
		value: 'M',
		label: 'Monthly',
	},
	{
		id: 2,
		value: 'M2',
		label: 'Monthly +1',
	},
	{
		id: 3,
		value: 'M3',
		label: 'Monthly +2',
	},
]

export const optionExpiry: DefaultOptionType[] = [
	{
		id: 1,
		value: 'W',
		label: 'Weekly',
	},
	{
		id: 2,
		value: 'W2',
		label: 'Weekly +1',
	},
	{
		id: 2,
		value: 'W3',
		label: 'Weekly +2',
	},
	{
		id: 3,
		value: 'W4',
		label: 'Weekly +3',
	},
	{
		id: 4,
		value: 'M',
		label: 'Monthly',
	},
	{
		id: 5,
		value: 'M2',
		label: 'Monthly +1',
	},
	{
		id: 6,
		value: 'M3',
		label: 'Monthly +2',
	},
	{
		id: 7,
		value: 'M4',
		label: 'Monthly +3',
	},
	{
		id: 8,
		value: 'Y',
		label: 'Yearly',
	},
]

export const exchangeType: DefaultOptionType[] = [
	{ type: 'NSE', id: 1, value: Exchange.NSE, label: 'NSE' },
	{ type: 'MCX', id: 2, value: Exchange.MCX, label: 'MCX' },
	{ type: 'CUR', id: 3, value: Exchange.CUR, label: 'CUR' },
]

export const tradeTypeData = [
	{
		id: 1,
		label: 'ATM +-Strike',
		value: 'ATMP',
		// children: [
		// 	{ id: 1, label: 'ATM', value: 'ATM' },
		// 	{ id: 2, label: 'ATM 1 STRIKE', value: 'ATM 1 STRIKE' },
		// 	{ id: 3, label: 'ATM 2 STRIKE', value: 'ATM 2 STRIKE' },
		// 	{ id: 4, label: 'ATM 3 STRIKE', value: 'ATM 3 STRIKE' },
		// 	{ id: 5, label: 'ATM 4 STRIKE', value: 'ATM 4 STRIKE' },
		// 	{ id: 6, label: 'ATM 5 STRIKE', value: 'ATM 5 STRIKE' },
		// 	{ id: 7, label: 'ATM 6 STRIKE', value: 'ATM 6 STRIKE' },
		// 	{ id: 8, label: 'ATM 7 STRIKE', value: 'ATM 7 STRIKE' },
		// 	{ id: 9, label: 'ATM 8 STRIKE', value: 'ATM 8 STRIKE' },
		// 	{ id: 10, label: 'ATM 9 STRIKE', value: 'ATM 9 STRIKE' },
		// 	{ id: 11, label: 'ATM 10 STRIKE', value: 'ATM 10 STRIKE' },
		// ],
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
	{
		id: 2,
		label: 'Atm +- n%',
		value: 'ATMS',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
	{
		id: 3,
		label: 'CP of stradle %',
		value: 'CPSP',
		children: [
			{ id: 1, label: '~', value: '~' },
			{ id: 2, label: '>=', value: '>=' },
			{ id: 3, label: '<=', value: '<=' },
		],
	},
	{
		id: 4,
		label: 'Closest Premium',
		value: 'ClosestPremium',
		children: [
			{ id: 1, label: '~', value: '~' },
			{ id: 2, label: '>=', value: '>=' },
			{ id: 3, label: '<=', value: '<=' },
		],
	},
	{
		id: 5,
		label: 'Highest OI',
		value: 'HighestOI',
		children: [
			{ id: 1, label: '1st highest OI', value: '1st highestOI' },
			{ id: 2, label: '2nd highest OI', value: '2nd highestOI' },
			{ id: 3, label: '3rd highest OI', value: '3rd highestOI' },
			{ id: 4, label: '4th highest OI', value: '4th highestOI' },
			{ id: 5, label: '5th highest OI', value: '5th highestOI' },
		],
	},
	{
		id: 6,
		label: 'CS of Spot %',
		value: 'CSSpot',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
	{
		id: 7,
		label: 'CP of Spot %',
		value: 'CPSpot',
		children: [
			{ id: 1, label: '+', value: '+' },
			{ id: 2, label: '-', value: '-' },
		],
	},
]

export const defaultInitialLegValues: SavedPosition = {
	id: '',
	quantityValue: 1,
	actionValue: TradeAction.Buy,
	optionType: OptionType.CALL,
	expiry: 'Monthly',
	tradeValue: 1,
	tradeOption: tradeTypeData[0].value,
	subTradeOption: 'ATM',
	instrument: '',
	subTradeOptionList: tradeTypeData[0].children,
}

export const defaultBasketData: SavedBasket = {
	id: '',
	name: '',
	ticker: '',
	identifier: 0,
	atm: BasketAtm.SPOT,
	exchange: Exchange.NSE,
	type: BasketType.INTRADAY,
	exitCondition: {
		move: false,
		totalLoss: 0,
		totalProfit: 0,
		repeat: RepeatType.NA,
		type: BasketExitType.SQOL,
	},
}

export const defaultLegsEXitCondition: PositionExitCondition = {
	stopLoss: {
		value: 0,
		type: YeildType.PERCENT,
	},
	totalProfit: {
		value: 0,
		type: YeildType.PERCENT,
	},
}

export const defaultNewBasket: SavedBasket = {
	id: '',
	name: '',
	ticker: '',
	exchange: Exchange.NSE,
	identifier: 0,
	type: BasketType.INTRADAY,
	atm: BasketAtm.SPOT,
	positions: [],
	exitCondition: {
		type: BasketExitType.SQOL,
		totalLoss: 0,
		totalProfit: 0,
	},
}

// Will be deleted when we recieve the data from api
export const tickerData: DefaultOptionType[] = [
	{ value: 'Ticker-1', label: 'Ticker-1' },
	{ value: 'Ticker-2', label: 'Ticker-2' },
	{ value: 'Ticker-3', label: 'Ticker-3' },
	{ value: 'Ticker-4', label: 'Ticker-4' },
]
