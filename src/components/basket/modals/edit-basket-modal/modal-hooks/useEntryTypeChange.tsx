import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'trade_type' | 'trade_type_params' | 'expiry'
export const useEntryTypeChange = (
	tradeType: string,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	key: keyValue
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem].entry_condition[key] !== tradeType) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							bask.entry_condition[key] = tradeType
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
