import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'quantity' | 'tradeTypeValue'

export const useValueChange = (
	value: number | undefined,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].entryCondition[key] !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.entryCondition[key] !== value) {
								const updatedBasket: BasketDataProps = {
									...bask,
									entryCondition: {
										...bask.entryCondition,
										[key]: value,
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
