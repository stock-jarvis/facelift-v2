import { Flex, theme, Button, Input, Select, Tooltip } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { useState } from 'react'
interface YeildButtonProps {
	label: string
}
const YeildButton = ({ label }: YeildButtonProps) => {
	const { token } = theme.useToken()
	const [buttonOpened, setButtonOpened] = useState(false)
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
						<Select style={{ minWidth: '70px' }} />
						<Input />
					</Flex>
					<CloseOutlined onClick={() => setButtonOpened(false)} />
				</Flex>
			)}
		</Flex>
	)
}

export default YeildButton
