import { useEffect } from 'react'
import { BasketDataProps } from 'src/components/basket/types/types'

type Key =
	| 'actionType'
	| 'optionType'
	| 'quantity'
	| 'tradeType'
	| 'tradeTypeParams'
	| 'tradeTypeValue'
	| 'expiry'

type Condition = 'entryCondition'
export const useActionChange = <T,>(
	actionValue: T,
	id: string,
	basket: BasketDataProps[],
	editBasket: (data: BasketDataProps[]) => void,
	condition: Condition,
	keyValue: Key
) => {
	useEffect(() => {
		const basketItem = basket.findIndex((b) => b.id === id)

		if (basketItem !== -1) {
			if (basket[basketItem][condition][keyValue] !== actionValue) {
				editBasket(
					basket.map((bask) => {
						if (bask.id === id) {
							if (bask[condition][keyValue] !== actionValue) {
								const updatedBasket: BasketDataProps = {
									...bask,
									[condition]: {
										...bask[condition],
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
	}, [id, basket, actionValue, editBasket, keyValue, condition])
}
