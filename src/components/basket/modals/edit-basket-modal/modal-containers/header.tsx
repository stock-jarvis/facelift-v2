import { Flex, Select, Space, theme } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
const Header = () => {
	const { token } = theme.useToken()
	return (
		<Flex align="center" flex="1">
			<Flex flex={1} gap={'middle'} justify="center">
				<Space>
					<Select
						style={{ width: '100px' }}
						options={[{ id: 1, value: 1, label: '1' }]}
					/>
				</Space>

				<Space>
					<Select
						style={{ width: '100px' }}
						options={[{ id: 1, value: 1, label: '1' }]}
					/>
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
