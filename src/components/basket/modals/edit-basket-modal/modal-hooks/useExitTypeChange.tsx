import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'stopLoss' | 'totalProfit'

export const useExitTypeChange = (
	value: string,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].exitCondition[key].type !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.exitCondition[key].type !== value) {
								const updatedBasket: BasketDataProps = {
									...bask,
									exitCondition: {
										...bask.exitCondition,
										[key]: {
											...bask.exitCondition[key],
											type: value,
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
	}, [id, basket, value, editBasket, key])
}
