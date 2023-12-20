import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type keyValue = 'stop_loss' | 'total_profit'

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
							if (bask.exit_condition[key].value !== value) {
								const updatedBasket: BasketDataProps = {
									...bask,
									exit_condition: {
										...bask.exit_condition,
										[key]: {
											...bask.exit_condition[key],
											value: value,
										},
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
