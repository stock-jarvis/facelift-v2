import { TimePickerProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { range } from 'radash'
import { Exchange } from '../enums'
import { timeBoundariesByExchange } from '../constants'

const TIME_TEMPLATE = 'HH:mm:ss'

const DATE_TEMPLATE = 'DD-MM-YYYY'

export const DATE_TEMPLATE_WITH_DAY = `ddd ${DATE_TEMPLATE}`

export const formatDate = (dayjsDate: Dayjs, showDayOfWeek?: boolean) =>
	dayjsDate.format(showDayOfWeek ? DATE_TEMPLATE_WITH_DAY : DATE_TEMPLATE)

export const formatTime = (dayjsTime: Dayjs) => dayjsTime.format(TIME_TEMPLATE)

export const getDisabledTimeByExchange =
	(exchange: Exchange): TimePickerProps['disabledTime'] =>
	() => {
		const { start, end } = timeBoundariesByExchange[exchange]

		return {
			disabledHours: () => [
				...range(0, start.hour - 1),
				...range(end.hour + 1, 23),
			],
			disabledMinutes: (selectedHour) => {
				if (selectedHour === start.hour) {
					return [...range(0, start.minute - 1)]
				}

				if (selectedHour === end.hour) {
					return [...range(end.minute + 1, 59)]
				}

				return []
			},
			disabledSeconds: (_, selectedMinute) => {
				if (selectedMinute === end.minute) {
					return [...range(end.second + 1, 59)]
				}

				if (selectedMinute === start.minute) {
					return [...range(0, start.second - 1)]
				}

				return []
			},
		}
	}
export const combineDateTime = (date: Dayjs, time: Dayjs) =>
	dayjs(`${date.format('YYYY-MM-DD')} ${time.format('HH:mm:ss')}`)

export const convertEpochInSecondsToDayJS = (
	epochInSeconds: number | undefined
) =>
	epochInSeconds && epochInSeconds >= 0
		? dayjs(epochInSeconds * 1000)
		: undefined

/**
 * Converts to DayJs
 *
 * @param date Server sends date in format ddmmyy
 */
export const convertDateFromServer = (date: string) => {
	const day = parseInt(date.substring(0, 2))
	const month = parseInt(date.substring(2, 4))
	const year = 2000 + parseInt(date.substring(4, 6))

	return dayjs(new Date(year, month, day))
}
