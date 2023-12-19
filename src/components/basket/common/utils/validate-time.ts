export const timeValidator = (
	entryHour: number,
	exitHour: number,
	entryMinute: number,
	exitMinute: number
) => {
	console.log('entry HOURS:', entryHour, entryMinute)
	console.log('exit HOURS:', exitHour, exitMinute)

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
