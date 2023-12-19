import { useEffect } from 'react'
import { RunTimeBasketData } from 'src/components/basket/types/types'

type keys = 'identifier'

export const useUndefinedNumberedSet = (
	value: number,
	dependentValue: RunTimeBasketData,
	key: keys,
	setData: (val: number) => void
) => {
	useEffect(() => {
		if (!value) {
			setData(dependentValue[key])
		}
	}, [setData, dependentValue, value, key])
}
