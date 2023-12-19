import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'total_profit' | 'stop_loss'

export const useExitValueChange = (
	value: number,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].exit_condition[key].value !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask.exit_condition[key].value = value
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
