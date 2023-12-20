import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'trade_type' | 'trade_type_params' | 'expiry'
//| 'stop_loss_type'
//| 'total_profit_type'
export const useTypeChange = (
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
							if (bask.entry_condition[key] !== tradeType) {
								const updatedBasket: BasketDataProps = {
									...bask,
									entry_condition: {
										...bask.entry_condition,
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
