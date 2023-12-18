import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

export const useExpiryChange = (
	expiryValue: string,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].expiry !== expiryValue) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask.expiry = expiryValue
							return bask
						} else {
							return bask
						}
					})
				)
			}
		}
	}, [id, basket, expiryValue, editBasket])
}
