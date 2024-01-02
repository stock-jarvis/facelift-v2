import { useCallback, useEffect, useRef, useState } from 'react'

export const useCountdown = ({
	time,
	interval = 1,
}: {
	time: number
	interval?: number
}) => {
	const [timeLeft, setTimeLeft] = useState(1)

	const countDownIntervalRef = useRef<number>()

	const startCountdown = useCallback(() => {
		setTimeLeft(time)
		countDownIntervalRef.current = setInterval(() => {
			console.log(timeLeft)
			if (timeLeft > 0) {
				setTimeLeft((timeLeft) => timeLeft - 1)
			}
		}, interval * 1000)
	}, [interval, time, timeLeft])

	useEffect(() => {
		if (timeLeft <= 0) {
			clearInterval(countDownIntervalRef.current)
		}
		return () => {
			clearInterval(countDownIntervalRef.current)
		}
	}, [timeLeft])

	return [startCountdown, timeLeft] as const
}
