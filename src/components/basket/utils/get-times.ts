import { timeBoundariesByExchange } from 'src/common/constants'
import { Exchange } from 'src/common/enums'
type timeRange = 'start' | 'end'
import objectSupport from 'dayjs/plugin/objectSupport'
import dayjs from 'dayjs'
export const getTimes = (exchange: Exchange, time: timeRange) => {
	dayjs.extend(objectSupport)
	const { hour, minute } = timeBoundariesByExchange[exchange][time]

	return dayjs({ hour, minute })
}
