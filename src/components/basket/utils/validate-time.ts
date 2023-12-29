export const timeValidator = (entryTime: string, exitTime: string) => {
	const entryTimeArray = entryTime.split(':')
	const exitTimeArray = exitTime.split(':')
	const entryHour: number = +entryTimeArray[0]
	const exitHour: number = +exitTimeArray[0]
	const entryMinute: number = +entryTimeArray[1]
	const exitMinute: number = +exitTimeArray[1]
	if (entryHour < exitHour) {
		return true
	}
	if (entryHour > exitHour) {
		return false
	}
	if (entryHour === entryHour) {
		if (entryMinute < exitMinute) {
			return true
		} else if (entryMinute >= exitMinute) {
			return false
		}
	} else {
		return false
	}

	return false
}
