import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'quantity' | 'trade_type_value'

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
			if (basket[basketItem].entry_condition[key] !== value) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.entry_condition[key] !== value) {
								const updatedBasket: BasketDataProps = {
									...bask,
									entry_condition: {
										...bask.entry_condition,
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
