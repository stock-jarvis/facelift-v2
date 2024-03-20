import { useState } from 'react'

interface ReturnType {
	isLoading: boolean
	startLoading: () => void
	stopLoading: () => void
}

const useIsLoading = (initialState: boolean = false): ReturnType => {
	const [isLoading, setIsLoading] = useState(initialState)
	const stopLoading = () => setIsLoading(false)
	const startLoading = () => setIsLoading(true)

	return {
		stopLoading,
		startLoading,
		get isLoading() {
			return isLoading
		},
	}
}

export default useIsLoading
