import { timeBoundariesByExchange } from 'src/common/constants'
import { Exchanges } from '../types/types'
type timeRange = 'start' | 'end'
export const getTimes = (exchange: Exchanges, time: timeRange) => {
	return (time =
		timeBoundariesByExchange[exchange][time].hour.toString() +
		':' +
		timeBoundariesByExchange[exchange][time].minute.toString())
}
