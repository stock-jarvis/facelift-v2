import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'tradeType' | 'tradeTypeParams' | 'expiry'

export const useTypeChange = (
	tradeType: string | undefined,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].entryCondition[key] !== tradeType) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.entryCondition[key] !== tradeType) {
								const updatedBasket: BasketDataProps = {
									...bask,
									entryCondition: {
										...bask.entryCondition,
										[key]: tradeType,
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
	}, [id, basket, tradeType, editBasket, key])
}
