/**
 * This utility helps us avoid type errors when data is null,
 * Also it helps keeping the local storage logic centralized
 */

const safeLocalStorage = {
	get: <ReturnType>(key: string): ReturnType | null => {
		if (!key || typeof key !== 'string') {
			throw new Error('Invalid local storage key type')
		}

		const res = localStorage.getItem(key)

		if (res) {
			try {
				return JSON.parse(res)
			} catch (error) {
				console.error('Error parsing localStorage value:', error)
				return null
			}
		}
		return null
	},
	set: <T>(key: string, value: T) => {
		const serializedValue = JSON.stringify(value)
		localStorage.setItem(key, serializedValue)
	},
}

export default safeLocalStorage
