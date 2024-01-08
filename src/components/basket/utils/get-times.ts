import { timeBoundariesByExchange } from 'src/common/constants'
import { Exchange } from 'src/common/enums'
type timeRange = 'start' | 'end'
export const getTimes = (exchange: Exchange, time: timeRange) => {
	return (time =
		timeBoundariesByExchange[exchange][time].hour.toString() +
		':' +
		timeBoundariesByExchange[exchange][time].minute.toString())
}
