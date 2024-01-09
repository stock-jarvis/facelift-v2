import { Dayjs } from 'dayjs'

export const timeValidator = (entryTime: Dayjs, exitTime: Dayjs) => {
	return entryTime.isBefore(exitTime)
}
