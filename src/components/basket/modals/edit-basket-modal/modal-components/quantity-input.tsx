import { Input } from 'antd'
import { InputProps } from 'antd'
import { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'

interface QuantityProps<T> {
	handleQantityChange: (value: number, paramType: T) => void
	baseQuantityValue: number
	paramType: T
}

const QuantityInput = <T,>({
	baseQuantityValue,
	handleQantityChange,
	paramType,
}: QuantityProps<T>) => {
	const [quantityValue, setQuantityValue] = useState<number>()

	useEffect(() => {
		if (!quantityValue) {
			setQuantityValue(baseQuantityValue)
		}
	}, [baseQuantityValue, quantityValue])

	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value <= 0) {
			setQuantityValue(1)
			handleQantityChange(1, paramType)
		} else {
			setQuantityValue(+e.target.value)
			handleQantityChange(+e.target.value, paramType)
		}
	}

	return (
		<Input
			value={quantityValue}
			style={{ width: '140px', textAlign: 'center' }}
			size="large"
			type="number"
			onChange={handleInputChange}
		/>
	)
}

export default QuantityInput
