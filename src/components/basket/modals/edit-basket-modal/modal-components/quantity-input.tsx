import { Flex, Typography, theme, Input } from 'antd'
import { InputProps } from 'antd'
import { ChangeEvent } from 'react'
import { useState, useEffect } from 'react'

interface QuantityProps {
	handleQantityChange: (value: number) => void
	baseQuantityValue: number
}

const QuantityInput = ({
	baseQuantityValue,
	handleQantityChange,
}: QuantityProps) => {
	const [quantityValue, setQuantityValue] = useState<number>()
	const { token } = theme.useToken()

	useEffect(() => {
		if (!quantityValue) {
			setQuantityValue(baseQuantityValue)
		}
	}, [baseQuantityValue, quantityValue])

	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value < 0) {
			setQuantityValue(1)
			handleQantityChange(1)
		} else {
			setQuantityValue(+e.target.value)
			handleQantityChange(+e.target.value)
		}
	}

	return (
		<Flex
			style={{
				width: 'fit-content',
				borderRadius: token.borderRadiusLG,
				padding: token.paddingSM,
			}}
			vertical
			justify="center"
			align="center"
		>
			<Typography.Text style={{ fontWeight: token.fontWeightStrong }}>
				Quantity
			</Typography.Text>
			<Input
				value={quantityValue}
				size="large"
				type="number"
				onChange={handleInputChange}
			/>
		</Flex>
	)
}

export default QuantityInput
