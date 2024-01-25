import { useState, useEffect, ChangeEvent } from 'react'
import {
	Typography,
	theme,
	Flex,
	Input,
	Descriptions,
	DescriptionsProps,
} from 'antd'

interface ProfitLossInputProps {
	label: string
	value: number
	setValue: (value: number) => void
}

const CappedButton: React.FC<ProfitLossInputProps> = ({
	label,
	value,
	setValue,
}) => {
	const { token } = theme.useToken()
	const [currentValue, setCurrentValue] = useState<number>()

	useEffect(() => {
		if (!currentValue) {
			setCurrentValue(value)
		}
	}, [currentValue, value])

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (+event.target.value < 0) {
			setCurrentValue(1)
			setValue(1)
		} else {
			setCurrentValue(+event.target.value)
			setValue(+event.target.value)
		}
	}

	const items: DescriptionsProps['items'] = [
		{
			key: 'value',
			label: (
				<Flex flex="1" justify="center">
					<Typography.Text>{label}</Typography.Text>
				</Flex>
			),
			children: (
				<Flex
					align="center"
					gap="middle"
					style={{
						backgroundColor: token.colorBgBase,
						paddingInlineStart: token.paddingContentHorizontalLG,
						borderRadius: token.borderRadiusLG,
					}}
				>
					<Typography.Text
						style={{
							fontSize: token.fontSizeXL,
							fontWeight: token.fontWeightStrong,
						}}
					>
						₹
					</Typography.Text>
					<Input
						className="select-none"
						value={currentValue}
						onChange={handleInputChange}
						type="number"
						size="large"
						style={{
							border: 'none',
							outline: 'none',
						}}
					/>
				</Flex>
			),
		},
	]

	return (
		<Flex
			className="select-none"
			style={{
				padding: token.paddingMD,
				borderRadius: token.borderRadiusLG,
			}}
		>
			<Descriptions bordered items={items} />
		</Flex>
	)
}

export default CappedButton
