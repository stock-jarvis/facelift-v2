import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue =
	| 'qunatity'
	| 'trade_type_value'
	| 'stop_loss_value'
	| 'total_profit_value'

export const useValueChange = (
	value: number,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem][key] !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask[key] = value
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
