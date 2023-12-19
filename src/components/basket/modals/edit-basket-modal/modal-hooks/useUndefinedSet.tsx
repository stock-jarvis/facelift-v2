import { useEffect } from 'react'
import { RunTimeBasketData } from 'src/components/basket/types/types'

type keys = 'name' | 'exchange' | 'instrument'

export const useUndefinedSet = (
	value: string | number | undefined,
	dependentValue: RunTimeBasketData,
	key: keys,
	setData: (val: string) => void
) => {
	useEffect(() => {
		if (!value) {
			setData(dependentValue[key])
		}
	}, [setData, dependentValue, value, key])
}
