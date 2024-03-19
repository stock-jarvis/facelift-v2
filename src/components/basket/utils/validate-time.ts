import { Dayjs } from 'dayjs'

export const timeValidator = (entryTime: Dayjs, exitTime: Dayjs) => {
	return true
	// entryTime.isBefore(exitTime)
}
