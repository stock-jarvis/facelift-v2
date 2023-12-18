import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type key = 'action_type' | 'option_type'
export const useActionChange = (
	actionValue: string,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	keyValue: key
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem][keyValue] !== actionValue) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask[keyValue] = actionValue
							return bask
						} else {
							return bask
						}
					})
				)
			}
		}
	}, [id, basket, actionValue, editBasket, keyValue])
}
