import { useEffect } from 'react'
import { SavedBasketsEntryCondition } from 'src/components/basket/types/types'
import { timeValidator } from 'src/components/basket/utils/validate-time'

export const useValidateTimes = (
	timeData: SavedBasketsEntryCondition,
	setTimeError: (val: boolean) => void
) => {
	const { entryTime, exitTime } = timeData!
	useEffect(() => {
		if (entryTime && exitTime) {
			const validate = timeValidator(entryTime, exitTime)
			if (validate) {
				setTimeError(false)
			} else {
				setTimeError(true)
			}
		}
	}, [timeData, setTimeError, entryTime, exitTime])
}
