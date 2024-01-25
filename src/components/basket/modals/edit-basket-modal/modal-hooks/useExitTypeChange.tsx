import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'stopLoss' | 'totalProfit'
type valueType = 'type' | 'value'
export const useExitTypeChange = <T,>(
	value: T,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue,
	data: valueType
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].exitCondition[key][data] !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.exitCondition[key][data] !== value) {
								const updatedBasket: BasketDataProps = {
									...bask,
									exitCondition: {
										...bask.exitCondition,
										[key]: {
											...bask.exitCondition[key],
											[data]: value,
										},
									},
								}
								return updatedBasket
							}
							return bask
						} else {
							return bask
						}
					})
				)
			}
		}
	}, [id, basket, value, editBasket, key, data])
}
