import { ItemType } from 'antd/es/menu/hooks/useItems'
import { DefaultOptionType } from 'antd/es/select'
import dayjs from 'dayjs'
import { LotSizeRes } from 'src/api/simulator/types'

const convertToItemType = (value: string | number) =>
	({
		key: value,
		label: value,
	}) as ItemType

export const convertValuesToItemType = (values: (string | number)[]) =>
	values.map(convertToItemType)

const convertToDefaultOption = (
	value: DefaultOptionType['value'],
	formatter?: (label: string | number) => string
) =>
	({
		label: formatter ? formatter(value || '') : value,
		value,
	}) as DefaultOptionType

export const convertValuesToDefaultOptions = (
	values: DefaultOptionType['value'][],
	formatter?: (label: string | number) => string
) => values.map((val) => convertToDefaultOption(val, formatter))

export const convertNumberToPercentageString = (value: number) => `${value}%`

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getDayPriceDiffInPercent = (
	dayOpen: number,
	prevDayClose: number
): number => {
	return ((dayOpen - prevDayClose) / prevDayClose) * 100
}

export const getDayOpenLabel = (
	dayOpen: number | undefined,
	dayClose: number | undefined,
	dayOpenPercentDiff: number
): string => {
	const diffPercent =
		dayClose != undefined ? `(${dayOpenPercentDiff.toFixed(2)})%` : ''

	return dayOpen != undefined ? `${dayOpen} ${diffPercent}` : 'NIL'
}

export const convertDDMMYYToDate = (date: number | string) => {
	const dateStr = date.toString()

	const [day, month, year] = [
		dateStr.slice(0, 2),
		dateStr.slice(2, 4),
		dateStr.slice(4, 6),
	]

	return `${day}-${dayjs()
		.month(+month - 1)
		.format('MMM')}-${year}`
}

export const convertUnixTimestampToDate = (timestamp: number) => {
	return dayjs(timestamp * 1000).utc()
}

export const convertLotSizeRes = (res: LotSizeRes | undefined) => {
	if (!res) return {}

	const keys = Object.keys(res.lotsizes || {})

	const parsed: LotSizeRes['lotsizes'] = {}
	keys.forEach((key) => {
		const parsedKey = convertUnixTimestampToDate(+key).format('DDMMYY')
		parsed[+parsedKey] = res?.lotsizes[+key]
	})

	return parsed
}
