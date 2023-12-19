import { useEffect } from 'react'
import { PersistedValues } from '../../../types/types'
import { tradeTypeData } from 'src/components/basket/constants/data'
export const usePersistState = (
	positionCopy: boolean,
	setPositionCopy: (val: boolean) => void,
	persistedValues: PersistedValues | undefined,
	setQuantityValue: (val: number) => void,
	setActionValue: (val: string) => void,
	setOptionType: (val: string) => void,
	setOptionExpiryBaseValue: (val: string) => void,
	setFutureExpiryBaseValue: (val: string) => void,
	setTradeOption: (val: string) => void,
	setSubTradeOption: (val: string) => void,
	setTradeValue: (val: number) => void
) => {
	useEffect(() => {
		if (positionCopy) {
			setQuantityValue(persistedValues?.quantityValue || 1)
			setActionValue(persistedValues?.actionValue || 'B')
			setOptionType(persistedValues?.optionType || 'CE')
			setOptionExpiryBaseValue(
				persistedValues?.optionExpiryBaseValue || 'Monthly'
			)
			setFutureExpiryBaseValue(
				persistedValues?.futureExpiryBaseValue || 'Monthly'
			)
			setTradeOption(persistedValues?.tradeOption || tradeTypeData[0].value)
			setSubTradeOption(
				persistedValues?.subTradeOption || tradeTypeData[0].children[0].value
			)
			setTradeValue(persistedValues?.tradeValue || 1)
			setPositionCopy(false)
		}
	}, [
		positionCopy,
		setPositionCopy,
		persistedValues,
		setQuantityValue,
		setActionValue,
		setOptionType,
		setTradeOption,
		setSubTradeOption,
		setTradeValue,
		setFutureExpiryBaseValue,
		setOptionExpiryBaseValue,
	])
}
