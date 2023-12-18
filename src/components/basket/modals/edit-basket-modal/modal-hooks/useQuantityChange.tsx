import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

export const useQuantityChange = (
	quantityValue: number,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].qunatity !== quantityValue) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask.qunatity = quantityValue
							return bask
						} else {
							return bask
						}
					})
				)
			}
		}
	}, [id, basket, quantityValue, editBasket])
}
