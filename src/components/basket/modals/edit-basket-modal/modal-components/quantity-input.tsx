import { Input } from 'antd'
import { InputProps } from 'antd'
import { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'

interface QuantityProps {
	handleQantityChange: (value: number) => void
	baseQuantityValue: number
}

const QuantityInput: React.FC<QuantityProps> = ({
	baseQuantityValue,
	handleQantityChange,
}) => {
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
			handleQantityChange(1)
		} else {
			setQuantityValue(+e.target.value)
			handleQantityChange(+e.target.value)
		}
	}

	return (
		<Input
			value={quantityValue}
			style={{ width: '140px' }}
			size="large"
			type="number"
			onChange={handleInputChange}
		/>
	)
}

export default QuantityInput
