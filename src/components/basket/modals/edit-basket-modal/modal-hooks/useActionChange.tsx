import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type key = 'actionType' | 'optionType'

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
			if (basket[basketItem].entryCondition[keyValue] !== actionValue) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask.entryCondition[keyValue] !== actionValue) {
								const updatedBasket: BasketDataProps = {
									...bask,
									entryCondition: {
										...bask.entryCondition,
										[keyValue]: actionValue,
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
	}, [id, basket, actionValue, editBasket, keyValue])
}
