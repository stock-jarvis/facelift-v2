import { Flex, theme, Button, Input, Select, Tooltip } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { useState, ChangeEvent } from 'react'
import { SelectProps, InputProps } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
interface YeildButtonProps {
	label: string
	options: OptionObject[]
	targetType: string
	targetValue: number
	handleTargetValueChange: (val: number) => void
	handleTargetTypeChange: (val: string) => void
}
const YeildButton = ({
	label,
	options,
	targetType,
	targetValue,
	handleTargetValueChange,
	handleTargetTypeChange,
}: YeildButtonProps) => {
	const { token } = theme.useToken()
	const [buttonOpened, setButtonOpened] = useState(false)

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
			{!buttonOpened ? (
				<Tooltip title={`Add ${label}`}>
					<Flex
						style={{
							height: 'fit-content',
							borderRadius: token.borderRadiusLG,
						}}
					>
						<Button
							onClick={() => {
								setButtonOpened(true)
							}}
							size="large"
							icon={
								<PlusOutlined
									style={{
										color: token.colorPrimary,
										border: 'none',
										boxShadow: 'none',
										outline: 'none',
									}}
								/>
							}
							style={{
								fontSize: token.fontSizeLG,
								fontWeight: token.fontWeightStrong,
								width: '150px',
							}}
						>
							{label}
						</Button>
					</Flex>
				</Tooltip>
			) : (
				<Flex
					style={{
						width: '200px',
						padding: token.paddingXS,
						borderRadius: token.borderRadiusLG,
						boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.25) inset',
					}}
					gap="middle"
				>
					<Flex>
						<Select
							style={{ minWidth: '90px' }}
							options={options}
							value={targetType}
							onChange={handleTypeChange}
						/>
						<Input value={targetValue} onChange={handleInputChange} />
					</Flex>
					<CloseOutlined onClick={() => setButtonOpened(false)} />
				</Flex>
			)}
		</Flex>
	)
}

export default YeildButton
