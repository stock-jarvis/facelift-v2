import { useEffect } from 'react'
import { timeValidator } from 'src/components/basket/common/utils/validate-time'
export const useValidateTimes = (
	currentEntryHour: number,
	currentExitHour: number,
	currentEntryMinute: number,
	currentExitMinute: number,
	setTimeError: (val: boolean) => void
) => {
	useEffect(() => {
		const validate = timeValidator(
			currentEntryHour,
			currentExitHour,
			currentEntryMinute,
			currentExitMinute
		)
		if (validate) {
			setTimeError(false)
		} else {
			setTimeError(true)
		}
	}, [
		currentEntryHour,
		currentExitHour,
		currentEntryMinute,
		currentExitMinute,
		setTimeError,
	])
}
