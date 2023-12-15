import { useState, useEffect, ChangeEvent } from 'react'
import { Typography, theme, Flex, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface CappedButtonProps {
	label: string
	value: number
	setValue: (value: number) => void
}

const CappedButton = ({ label, value, setValue }: CappedButtonProps) => {
	const { token } = theme.useToken()
	const [isCapped, setIsCapped] = useState(true)
	const [currentValue, setCurrentValue] = useState<number>()

	useEffect(() => {
		if (!currentValue) {
			setCurrentValue(value)
		}
	}, [currentValue, value])

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(+event.target.value)
		setValue(+event.target.value)
	}

	return (
		<Flex
			style={{
				width: '340px',
				borderRadius: token.borderRadiusLG,
				boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.25)',
			}}
		>
			{isCapped ? (
				<Flex
					onClick={() => setIsCapped(false)}
					style={{
						padding: token.paddingMD,
						borderRadius: token.borderRadiusLG,
						backgroundColor: token.colorPrimary,
					}}
					justify="center"
					flex={1}
				>
					<Typography.Text
						style={{
							fontWeight: token.fontWeightStrong,
							fontSize: token.fontSizeLG,
							color: token.colorBgBase,
						}}
					>
						{label}
					</Typography.Text>
				</Flex>
			) : (
				<Flex
					style={{
						padding: token.paddingMD,
						borderRadius: token.borderRadiusLG,
						backgroundColor: '#F1F8FF',
					}}
					justify="center"
					align="center"
					flex={1}
					gap="middle"
				>
					<Flex>
						<Typography.Text style={{ textWrap: 'nowrap' }}>
							{label}
						</Typography.Text>
					</Flex>
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
					<CloseOutlined
						style={{ fontWeight: token.fontWeightStrong }}
						onClick={() => setIsCapped(true)}
					/>
				</Flex>
			)}
		</Flex>
	)
}

export default CappedButton
