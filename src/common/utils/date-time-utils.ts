import { Dayjs } from 'dayjs'

const TIME_TEMPLATE = 'HH:mm:ss'

const DATE_TEMPLATE = 'DD-MM-YYYY'

export const DATE_TEMPLATE_WITH_DAY = `ddd ${DATE_TEMPLATE}`

export const getDateAsStringFromDayjs = (
	dayjsDate: Dayjs,
	showDayOfWeek?: boolean
) => dayjsDate.format(showDayOfWeek ? DATE_TEMPLATE_WITH_DAY : DATE_TEMPLATE)

export const getTimeAsStringFromDayjs = (dayjsTime: Dayjs) =>
	dayjsTime.format(TIME_TEMPLATE)
