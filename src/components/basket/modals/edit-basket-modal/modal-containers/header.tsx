import { Flex, Select, Space, theme, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
const Header = () => {
	const { token } = theme.useToken()
	return (
		<Flex align="center" flex="1">
			<Flex flex={1} gap={'middle'} justify="center">
				<Space>
					<Tooltip title="Select an Exchange">
						<Select
							style={{ width: '100px' }}
							options={[{ id: 1, value: 1, label: '1' }]}
						/>
					</Tooltip>
				</Space>

				<Space>
					<Tooltip title="Select Instrument">
						<Select
							style={{ width: '100px' }}
							options={[{ id: 1, value: 1, label: '1' }]}
						/>
					</Tooltip>
				</Space>
			</Flex>
			<Flex
				style={{
					padding: token.paddingXS,
				}}
			>
				<CloseOutlined style={{ color: '#ffffff' }} />
			</Flex>
		</Flex>
	)
}

export default Header
