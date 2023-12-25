import { Flex, theme, Input, Select } from 'antd'

import { ChangeEvent } from 'react'
import { SelectProps, InputProps } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'

interface YeildButtonProps {
	options: OptionObject[]
	targetType: string
	targetValue: number
	handleTargetValueChange: (val: number) => void
	handleTargetTypeChange: (val: string) => void
}
const YeildButton: React.FC<YeildButtonProps> = ({
	options,
	targetType,
	targetValue,
	handleTargetValueChange,
	handleTargetTypeChange,
}: YeildButtonProps) => {
	const { token } = theme.useToken()

	const handleTypeChange: SelectProps['onChange'] = (value: string) => {
		handleTargetValueChange(0)
		handleTargetTypeChange(value)
	}
	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value <= 0) {
			handleTargetValueChange(0)
		} else {
			if (targetType === 'percent') {
				if (+e.target.value > 100) {
					handleTargetValueChange(100)
				} else {
					handleTargetValueChange(+e.target.value)
				}
			} else {
				handleTargetValueChange(+e.target.value)
			}
		}
	}

	return (
		<Flex align="center">
			<Flex
				style={{
					width: '210px',
					padding: token.paddingXS,
				}}
				gap="middle"
			>
				<Flex align="center">
					<Select
						style={{ minWidth: '90px' }}
						options={options}
						value={targetType}
						onChange={handleTypeChange}
					/>
					<Input
						suffix={
							targetType === 'percent'
								? '%'
								: targetType === 'rupees'
									? '₹'
									: 'Pt'
						}
						style={{ width: '90px' }}
						value={targetValue}
						onChange={handleInputChange}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default YeildButton
