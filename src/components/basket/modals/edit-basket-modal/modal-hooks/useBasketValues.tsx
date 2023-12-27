import { useImmer } from 'use-immer'
import { useEffect } from 'react'
import { useBasketStore } from 'src/components/basket/store/basket-store'

export const useBasketValues = () => {
	const { editableBasketData } = useBasketStore()
	const [basketBaseValues, updateBasketBaseValues] = useImmer({
		identifier: -1,
		instrument: '',
		exchange: '',
		name: '',
		atm: '',
	})

	useEffect(() => {
		if (editableBasketData) {
			if (
				!basketBaseValues.name &&
				!basketBaseValues.exchange &&
				!basketBaseValues.instrument &&
				basketBaseValues.identifier === -1 &&
				!basketBaseValues.atm
			) {
				updateBasketBaseValues({
					...basketBaseValues,
					name: editableBasketData.name,
					exchange: editableBasketData.exchange,
					instrument: editableBasketData.instrument,
					identifier: editableBasketData.identifier,
					atm: 'spot',
				})
			}
		}
	}, [editableBasketData, basketBaseValues, updateBasketBaseValues])

	return { outerData: basketBaseValues, updateData: updateBasketBaseValues }
}
