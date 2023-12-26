import { useEffect } from 'react'
import { PersistedValues, BasketDataValues } from '../../../types/types'
import { tradeTypeData } from 'src/components/basket/constants/data'
export const usePersistState = (
	basketInitialData: BasketDataValues,
	updatedBasketData: (val: BasketDataValues) => void,
	positionCopy: boolean,
	setPositionCopy: (val: boolean) => void,
	persistedValues: PersistedValues | undefined
	//setOptionType: (val: string) => void,
) => {
	useEffect(() => {
		if (positionCopy) {
			updatedBasketData({
				...basketInitialData,
				quantity: persistedValues?.quantityValue || 1,
				action: persistedValues?.actionValue || 'B',
				expiry: persistedValues?.expiry || 'Monthly',
				option: persistedValues?.optionType || 'CE',
				tradeValue: persistedValues?.tradeValue || 1,
				tradeOption: persistedValues?.tradeOption || tradeTypeData[0].value,
				subTradeOption:
					persistedValues?.subTradeOption || tradeTypeData[0].children[0].value,
			})

			setPositionCopy(false)
		}
	}, [
		basketInitialData,
		updatedBasketData,
		positionCopy,
		setPositionCopy,
		persistedValues,
	])
}
