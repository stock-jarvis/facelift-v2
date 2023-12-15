import { Flex, Typography, theme } from 'antd'

interface NameProps {
	name: string
}

const NameSection = ({ name }: NameProps) => {
	const { token } = theme.useToken()
	return (
		<Flex flex="1" align="center">
			<Flex
				style={{
					backgroundColor: token.colorPrimary,
					padding: token.paddingXS,
					border: `1px solid ${token.colorPrimary}`,
					color: '#fff',
				}}
				flex="1"
			>
				<Typography.Text className="text-inherit" color="primary">
					{name.toUpperCase()}
				</Typography.Text>
			</Flex>
			<Flex
				flex="3"
				style={{
					padding: token.paddingXS,
				}}
				className="border-y-[1px]"
			>
				<Typography.Text style={{ color: 'black' }}>Apple</Typography.Text>
			</Flex>
		</Flex>
	)
}

export default NameSection
