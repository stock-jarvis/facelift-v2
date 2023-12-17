import { Flex, theme, Button, Input, Select, Tooltip } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { SelectProps } from 'antd'
import { OptionObject } from 'src/components/basket/types/types'
interface YeildButtonProps {
	label: string
	options: OptionObject[]
	targetType: string
	handleTargetTypeChange: (val: string) => void
}
const YeildButton = ({
	label,
	options,
	targetType,
	handleTargetTypeChange,
}: YeildButtonProps) => {
	const { token } = theme.useToken()
	const [buttonOpened, setButtonOpened] = useState(false)

	const handleTypeChange: SelectProps['onChange'] = (value: string) => {
		handleTargetTypeChange(value)
	}
	return (
		<Flex align="center">
			{!buttonOpened ? (
				<Tooltip title={`Add ${label}`}>
					<Flex
						style={{
							height: 'fit-content',
							//border: `2px solid ${token.colorPrimary}`,
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
						//width: 'fit-content',
						//	border: `2px solid ${token.colorPrimary}`,
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
						<Input />
					</Flex>
					<CloseOutlined onClick={() => setButtonOpened(false)} />
				</Flex>
			)}
		</Flex>
	)
}

export default YeildButton
