import { Flex, theme, Input, Select } from 'antd'

import { ChangeEvent } from 'react'
import { InputProps } from 'antd'
import { YeildType, YeildLabel } from 'src/components/basket/types/types'
import { DefaultOptionType, SelectProps } from 'antd/es/select'
import { useMemo } from 'react'
export interface YeildButtonProps<T> {
	targetOn: YeildLabel
	targetType: YeildType
	targetValue: number
	paramType: T
	paramValue: T
	handleTargetValueChange: (val: number, type: T) => void
	handleTargetTypeChange: (val: string, type: T) => void
}
const YeildButton = <T,>({
	targetType,
	targetValue,
	paramType,
	paramValue,
	targetOn,
	handleTargetValueChange,
	handleTargetTypeChange,
}: YeildButtonProps<T>) => {
	const { token } = theme.useToken()

	const Options: DefaultOptionType[''] = useMemo(
		() => [
			{
				id: 1,
				value: YeildType.PERCENT,
				label: `${targetOn} %`,
			},
			{
				id: 2,
				value: YeildType.RUPEES,
				label: `${targetOn} ₹`,
			},
			{
				id: 3,
				value: YeildType.POINTS,
				label: `${targetOn} Pt`,
			},
		],
		[targetOn]
	)

	const handleTypeChange: SelectProps['onChange'] = (type: string) => {
		handleTargetTypeChange(type, paramType)
		handleTargetValueChange(0, paramValue)
	}
	const handleInputChange: InputProps['onChange'] = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (+e.target.value <= 0) {
			handleTargetValueChange(0, paramValue)
		} else {
			if (targetType === YeildType.PERCENT) {
				if (+e.target.value > 100) {
					handleTargetValueChange(100, paramValue)
				} else {
					handleTargetValueChange(+e.target.value, paramValue)
				}
			} else {
				handleTargetValueChange(+e.target.value, paramValue)
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
						options={Options}
						value={targetType}
						onChange={handleTypeChange}
					/>
					<Input
						suffix={
							targetType === YeildType.PERCENT
								? '%'
								: targetType === YeildType.RUPEES
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
